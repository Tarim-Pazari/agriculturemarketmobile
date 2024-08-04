import {
  View,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Calendar, CalendarProvider, WeekCalendar} from 'react-native-calendars';
import dayjs from 'dayjs';
import Input from '../components/Input/Input';
import {
  faAngleLeft,
  faAngleRight,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../components/ProductCard/ProductCard';

import AlertDialog from '../components/AlertDialog/AlertDialog';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import {useGetDailyPriceByIdsMutation} from '../services/dailyPriceService';
import DailyPriceResponse from '../payload/response/DailyPriceResponse';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import CustomFlatList from '../components/Flatlist/CustomFlatList';

import SelectCity from '../components/SelectCity/SelectCity';
import CustomText from '../components/Text/Text';
import CustomBottomSheet, {
  BottomSheetRef,
} from '../components/BottomSheet/CustomBottomSheet';
import CityListBottomSheet from '../components/BottomSheet/CityListBottomSheet';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export default function HomeScreen(
  props: NativeStackScreenProps<RootStackParamList>,
) {
  const location = useSelector((state: RootState) => state.app.location);
  const userSelection = location;
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));
  const [items, setItems] = useState<Array<DailyPriceResponse>>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [calendarType, setCalendarType] = useState<'week' | 'month'>('week');
  const [useGetDailyPriceByIds] = useGetDailyPriceByIdsMutation();

  const locationBottomSheetRef = useRef<BottomSheetRef>(null);

  useEffect(() => {
    loadData();
  }, [selectedDay, userSelection]);

  const loadData = async () => {
    if (userSelection?.city && userSelection?.district) {
      setLoading(true);
      let entity: DailyPriceByIdRequest = {
        date: selectedDay,
        cityId: userSelection.city.id,
        districtId: userSelection.district.id,
      };
      useGetDailyPriceByIds(entity)
        .unwrap()
        .then(response => {
          if (response?.list?.length !== 0) {
            setItems(response.list);
          } else {
            setItems([]);
            AlertDialog.showModal({
              title: 'Uyarı',
              message: response?.message || response.exceptionMessage,
            });
          }
        })
        .catch(error => console.error(error, 'hata'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  };
  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={{
          height:
            Platform.OS === 'ios'
              ? calendarType === 'week'
                ? 210
                : 'auto'
              : calendarType === 'week'
              ? 160
              : 'auto',
          backgroundColor: '#1E8604',
        }}>
        {calendarType === 'week' && (
          <Pressable
            onPress={() => {
              setCalendarType(calendarType === 'week' ? 'month' : 'week');
            }}>
            <CustomText fontSizes="h5" center color="white">
              {dayjs(selectedDay).format('MMMM YYYY')}
            </CustomText>
          </Pressable>
        )}
        {calendarType === 'week' ? (
          <CalendarProvider
            onDateChanged={date => {
              setSelectedDay(date);
            }}
            date={selectedDay}>
            <WeekCalendar
              date={selectedDay}
              onDayPress={day => {
                let maxDate = dayjs().format('YYYY-MM-DD');
                let selectedDate = dayjs(day.dateString).format('YYYY-MM-DD');
                if (selectedDate > maxDate) {
                  AlertDialog.showModal({
                    title: 'Uyarı',
                    message: 'İleri tarih seçilemez.',
                  });
                  return;
                }
                setSelectedDay(day.dateString);
              }}
              firstDay={1}
              theme={{
                calendarBackground: 'transparent',
                backgroundColor: 'transparent',
                dayTextColor: '#fff',
                textSectionTitleColor: '#fff',
                selectedDayBackgroundColor: '#72B262',
                textDisabledColor: '#9B9B9B',
              }}
            />
          </CalendarProvider>
        ) : (
          <Calendar
            initialDate={selectedDay}
            customHeader={(date: any) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#1E8604',
                    paddingHorizontal: 20,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      date.addMonth(-1);
                    }}>
                    <FontAwesomeIcon
                      icon={faAngleLeft}
                      color="white"
                      size={20}
                    />
                  </TouchableOpacity>
                  <Pressable
                    onPress={() => {
                      setCalendarType('week');
                    }}>
                    <CustomText fontSizes="h5" center color="white">
                      {dayjs(date.month).format('MMMM YYYY')}
                    </CustomText>
                  </Pressable>

                  <TouchableOpacity
                    onPress={() => {
                      date.addMonth(1);
                    }}>
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      color="white"
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
            dayComponent={(props: any) => {
              const {date, state} = props;
              let textColor = 'white';
              if (state === 'disabled') {
                textColor = 'grey';
              }
              return (
                <TouchableOpacity
                  onPress={() => {
                    let maxDate = dayjs().format('YYYY-MM-DD');
                    let selectedDate = dayjs(date.dateString).format(
                      'YYYY-MM-DD',
                    );
                    if (selectedDate > maxDate) {
                      AlertDialog.showModal({
                        title: 'Uyarı',
                        message: 'İleri tarih seçilemez.',
                      });
                      return;
                    }
                    setSelectedDay(date.dateString);
                  }}
                  style={{
                    backgroundColor:
                      date.dateString === selectedDay
                        ? '#72B262'
                        : 'transparent',
                    borderRadius: 10,
                    height: 30,
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomText center color={textColor as any}>
                    {date.day}
                  </CustomText>
                </TouchableOpacity>
              );
            }}
            theme={{
              calendarBackground: 'transparent',
              backgroundColor: 'transparent',
              dayTextColor: '#fff',

              selectedDayBackgroundColor: '#72B262',
              selectedDayTextColor: '#fff',
            }}
          />
        )}

        <View style={{marginTop: 10, marginBottom: 7, marginHorizontal: 10}}>
          <Input
            onFocus={() => {}}
            enableFocusBorder={false}
            autoFocus={false}
            style={{backgroundColor: '#fff'}}
            icon={faSearch}
            placeholder="Ürün Ara"
            onChangeText={text => setSearch(text)}
            value={search}
          />
        </View>
      </SafeAreaView>
      <SelectCity locationBottomSheetRef={locationBottomSheetRef} />
      <View
        style={{
          flex: 1,

          marginBottom: Platform.OS === 'ios' ? 0 : 80,
        }}>
        <View
          style={
            loading
              ? {justifyContent: 'center', alignItems: 'center', flex: 1}
              : {flex: 1}
          }>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <CustomFlatList
              handleRefresh={loadData}
              notFoundText="Fiyat listesi bulunamadı."
              renderItem={(item, index) => {
                return <ProductCard item={item} />;
              }}
              data={items?.filter?.(item => {
                return item?.name
                  ?.toLowerCase?.()
                  .includes(search.toLowerCase());
              })}
            />
          )}
        </View>
      </View>
      <CityListBottomSheet
        close={() => {
          locationBottomSheetRef.current?.close();
        }}
        ref={locationBottomSheetRef}
      />
    </View>
  );
}
