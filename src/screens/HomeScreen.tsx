import {
  View,
  Image,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
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
import Geolocation from '@react-native-community/geolocation';
import AlertDialog from '../components/AlertDialog/AlertDialog';
import {
  PERMISSIONS,
  check,
  request,
  requestLocationAccuracy,
} from 'react-native-permissions';

export default function HomeScreen() {
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));
  const [items, setItems] = useState<Array<ProductResponse>>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    requestLocation();
    return () => {};
  }, []);

  const requestLocation = () => {
    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then(result => {
        if (result === 'granted') {
          getCurrentPosition();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDWYCTI8yo7w8BHdxlgEbmABI0boJXy-JQ`,
        )
          .then(response => response.json())
          .then(result => {
            let cityName = result.results[0].address_components.filter(
              (item: any) => item.types.includes('administrative_area_level_1'),
            )?.[0]?.long_name;
            Alert.alert('Konum', cityName);
          });
      },
      error => {
        console.log('a');
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

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
