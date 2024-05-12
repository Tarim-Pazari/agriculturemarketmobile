import {
  View,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CalendarProvider, WeekCalendar} from 'react-native-calendars';
import dayjs from 'dayjs';
import Input from '../components/Input/Input';
import {
  faExclamationTriangle,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../components/ProductCard/ProductCard';
import ProductResponse from '../payload/response/ProductResponse';
import CurrentPositionHook from '../hooks/CurrentPositionHook';
import RequestLocationHook from '../hooks/RequestLocationHook';

export default function HomeScreen() {
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));
  const [items, setItems] = useState<Array<ProductResponse>>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadData();
    return () => {};
  }, [selectedDay]);

  const loadData = async () => {
    setLoading(true);
    let fixedDate = dayjs(selectedDay).format('YYYYMMDD');
    fetch(`http://192.168.1.140:8080/api/v1/daily-price/${fixedDate}`, {
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
            renderItem={({item}) => <ProductCard item={item} />}
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
