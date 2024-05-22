import {
  View,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CalendarProvider, WeekCalendar} from 'react-native-calendars';
import dayjs from 'dayjs';
import Input from '../components/Input/Input';
import {faMapMarkerAlt, faSearch} from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../components/ProductCard/ProductCard';
import CurrentPositionHook from '../hooks/CurrentPositionHook';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import styled from 'styled-components';
import CustomText from '../components/Text/Text';
import AlertDialog from '../components/AlertDialog/AlertDialog';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import {useGetDailyPriceMutation} from '../services/dailyPriceService';
import DailyPriceResponse from '../payload/response/DailyPriceResponse';
import DailyPriceRequest from '../payload/request/DailyPriceRequest';

export default function HomeScreen(
  props: NativeStackScreenProps<RootStackParamList>,
) {
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));
  const [items, setItems] = useState<Array<DailyPriceResponse>>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const {cityName, districtName, positionLoading, getFullAddress} =
    CurrentPositionHook();
  const [useGetDailyPrice] = useGetDailyPriceMutation();
  useEffect(() => {
    if (!positionLoading) {
      loadData();
    }
  }, [selectedDay, positionLoading]);

  const loadData = async () => {
    setLoading(true);
    if (cityName && selectedDay) {
      let fixedDate = dayjs(selectedDay).format('YYYYMMDD');
      let entity: DailyPriceRequest = {
        date: fixedDate,
        cityName: cityName,
        districtName: districtName,
      };
      useGetDailyPrice(entity)
        .unwrap()
        .then(response => {
          console.log(response, 'response');
          if (response?.list?.length !== 0) {
            setItems(response.list);
          } else {
            AlertDialog.showModal({
              title: 'Uyarı',
              message: response?.message || response.exceptionMessage,
            });
          }
        })
        .catch(error => console.error(error, 'hata'))
        .finally(() => setLoading(false));
    }
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={{
          flex: Platform.OS === 'ios' ? 0.22 : 0.25,
          backgroundColor: '#1E8604',
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
                selectedDayBackgroundColor: '#72B262',
              }}
            />
          </View>
        </CalendarProvider>
        <View style={{marginTop: 10, marginBottom: 7, marginHorizontal: 10}}>
          <Input
            enableFocusBorder={false}
            inputSize="sm"
            style={{backgroundColor: '#fff'}}
            icon={faSearch}
            placeholder="Ürün Ara"
            onChangeText={text => setSearch(text)}
            value={search}
          />
        </View>
      </SafeAreaView>

      <View style={{flex: 1, marginBottom: 60}}>
        {!positionLoading && (
          <LanguageButton activeOpacity={0.8} onPress={() => {}}>
            <View style={{flexDirection: 'row', gap: 10}}>
              <FontAwesomeIcon icon={faMapMarkerAlt} color="blue" />
              <CustomText color="primary">{getFullAddress()}</CustomText>
            </View>
            <CustomText color="grey">Değiştir</CustomText>
          </LanguageButton>
        )}

        <View
          style={
            loading
              ? {justifyContent: 'center', alignItems: 'center', flex: 1}
              : {}
          }>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <ProductCard
                  onPress={() => {
                    props.navigation.navigate('ProductScreen', {
                      product: item.product,
                    });
                  }}
                  item={item}
                />
              )}
              keyExtractor={item => item.id.toString()}
              data={items?.filter?.(item => {
                return item?.product?.name
                  ?.toLowerCase?.()
                  .includes(search.toLowerCase());
              })}
            />
          )}
        </View>
      </View>
    </View>
  );
}
const LanguageButton = styled(TouchableOpacity)`
  flex-direction: row;
  gap: 10px;
  align-items: center;
  margin-horizontal: 10px;
  margin-top: 10px;
  margin-bottom: 7px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  justify-content: space-between;
`;
