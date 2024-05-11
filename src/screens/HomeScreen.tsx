import {
  View,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CalendarProvider, WeekCalendar} from 'react-native-calendars';
import dayjs from 'dayjs';
import Input from '../components/Input/Input';
import {
  faExclamationTriangle,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import CustomText from '../components/Text/Text';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell, faHeart} from '@fortawesome/free-regular-svg-icons';
import AlertDialog from '../components/AlertDialog/AlertDialog';

interface Item {
  date: string;
  icon: string;
  id: number;
  name: string;
  minPrice: number;
  maxPrice: number;
  unit: string;
}

export default function HomeScreen() {
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));
  const [items, setItems] = useState<Array<Item>>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadData();
    return () => {};
  }, [selectedDay]);

  const loadData = async () => {
    setLoading(true);
    let fixedDate = dayjs(selectedDay).format('YYYYMMDD');
    fetch(`http://localhost:8080/api/v1/daily-price/${fixedDate}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(result => {
        if (result.length !== 0) {
          let firstItem = result[0];
          let fixedDate = dayjs(selectedDay).format('YYYYMMDD');
          if (fixedDate !== firstItem.date) {
            // AlertDialog.showModal({
            //   title: 'Uyarı',
            //   message:
            //     'Seçtiğiniz tarihe ait güncel hal fiyatları yayınlanmadı. Yayınlanmış son hal fiyatları gösterilmektedir.',
            // });
          }
        }
        setItems(result);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  };
  const Card = (props: {item: Item}) => {
    const {item} = props;
    const [selectedReminder, setSelectedReminder] = useState(false);
    return (
      <CardContainer>
        <ProductImage
          resizeMode="cover"
          source={{uri: 'http://localhost:8080/' + item.icon}}
        />
        <ProductContainer>
          <ProductHeader>
            <ProductName>{item.name}</ProductName>
            <ProductReminderButton
              activeOpacity={0.8}
              onPress={() => setSelectedReminder(!selectedReminder)}
              theme={{
                selected: selectedReminder,
              }}>
              <FontAwesomeIcon
                icon={faBell}
                size={12}
                color={selectedReminder ? '#FFF' : '#fab421'}
              />
            </ProductReminderButton>
          </ProductHeader>
          <ProductInformation>
            <ProductUnit>{item.unit}</ProductUnit>
            <ProductPrices>
              <ProductMinPrice>
                {new Intl.NumberFormat('tr-TR', {
                  style: 'currency',
                  currency: 'TRY',
                }).format(item.minPrice)}
              </ProductMinPrice>
              <ProductMaxPrice>
                {new Intl.NumberFormat('tr-TR', {
                  style: 'currency',
                  currency: 'TRY',
                }).format(item.maxPrice)}
              </ProductMaxPrice>
            </ProductPrices>
          </ProductInformation>
        </ProductContainer>
      </CardContainer>
    );
  };
  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={{
          flex: 0.11,
          backgroundColor: '#FAB421',
        }}>
        <CalendarProvider date={selectedDay}>
          <View>
            <WeekCalendar
              date={selectedDay}
              onDayPress={day => {
                setSelectedDay(day.dateString);
              }}
              firstDay={1}
              theme={{
                calendarBackground: 'transparent',
                backgroundColor: 'transparent',
                dayTextColor: '#fff',
                textSectionTitleColor: '#fff',
                selectedDayBackgroundColor: '#0D9925',
              }}
            />
          </View>
        </CalendarProvider>
      </SafeAreaView>

      <View
        style={[
          {flex: 1},
          loading ? {justifyContent: 'center', alignItems: 'center'} : {},
        ]}>
        {!loading && (
          <View style={{marginTop: 10, marginBottom: 5, marginHorizontal: 10}}>
            <Input
              icon={faSearch}
              placeholder="Ürün Ara"
              onChangeText={text => setSearch(text)}
              value={search}
            />
          </View>
        )}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <Card item={item} />}
            keyExtractor={item => item.id.toString()}
            data={items?.filter?.(item => {
              return item.name.toLowerCase().includes(search.toLowerCase());
            })}
          />
        )}
      </View>
    </View>
  );
}
const CardContainer = styled(View)`
  flex-direction: row;
  border-width: 1px;
  border-color: #ddd;
  padding: 10px;
  margin-vertical: 5px;
  border-radius: 5px;
  align-items: center;
  gap: 10px;
  margin-horizontal: 10px;
  box-shadow: 3px 3px 3px #ddd;
  background-color: #fff;
`;
const ProductContainer = styled(View)`
  flex: 1;
  gap: 8px;
`;
const ProductInformation = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;
const ProductImage = styled(Image)`
  width: 50px;
  height: 50px;
`;
const ProductHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;
const ProductName = styled(CustomText)`
  font-size: 13px;
  color: #444;
  font-weight: bold;
`;
const ProductUnit = styled(CustomText)`
  font-size: 11px;
  color: #4e4e4e;
`;
const ProductPrices = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  padding: 3px;
  align-items: center;
`;
const ProductMinPrice = styled(CustomText)`
  font-size: 11px;
  color: #ef0606;
`;
const ProductMaxPrice = styled(CustomText)`
  font-size: 11px;
  color: #60a918;
`;
const ProductReminderButton = styled(TouchableOpacity)`
  height: 20px;
  width: 20px;
  background-color: ${props => (props.theme.selected ? '#fab421' : '#FFF')};
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border-width: 1px;
  border-color: #fab421;
`;
