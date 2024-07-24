import {
  View,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Dimensions,
  Keyboard,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {CalendarProvider, WeekCalendar} from 'react-native-calendars';
import dayjs from 'dayjs';
import Input from '../components/Input/Input';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
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
import BottomSheetComponent from '../components/BottomSheet/BottomSheetComponent';

export default function HomeScreen(
  props: NativeStackScreenProps<RootStackParamList>,
) {
  const location = useSelector((state: RootState) => state.app.location);
  const userSelection = location;
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));
  const [items, setItems] = useState<Array<DailyPriceResponse>>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const refRBSheet = useRef<any>(null);
  const [useGetDailyPriceByIds] = useGetDailyPriceByIdsMutation();

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
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
          height: Platform.OS === 'ios' ? 210 : 160,
          backgroundColor: '#1E8604',
        }}>
        <Pressable
          onPress={() => {
            setIsBottomSheetVisible(true);
          }}>
          <CustomText fontSizes="h5" center color="white">
            {dayjs(selectedDay).format('MMMM YYYY')}
          </CustomText>
        </Pressable>
        <CalendarProvider date={selectedDay}>
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
            }}
          />
        </CalendarProvider>
        <View style={{marginTop: 10, marginBottom: 7, marginHorizontal: 10}}>
          <Input
            onFocus={() => {
              AlertDialog.showModal({
                title: 'Uyarı',
                message: 'Lütfen konum seçiniz.',
                type: 'success',
              });
            }}
            enableFocusBorder={false}
            inputSize="sm"
            autoFocus={false}
            style={{backgroundColor: '#fff'}}
            icon={faSearch}
            placeholder="Ürün Ara"
            onChangeText={text => setSearch(text)}
            value={search}
          />
        </View>
      </SafeAreaView>
      <SelectCity refRBSheet={refRBSheet} />
      <View style={{flex: 1, marginBottom: Platform.OS === 'ios' ? 0 : 80}}>
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
                return (
                  <ProductCard
                    onPress={() => {
                      // props.navigation.navigate('ProductScreen', {
                      //   product: {
                      //     id: item.productId,
                      //     name: item.name,
                      //     icon: item.icon,
                      //     unit: item.unit,
                      //   },
                      // });
                    }}
                    item={item}
                  />
                );
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
      <BottomSheetComponent
        enableClose
        isOpen={isBottomSheetVisible}
        handleOpen={() => {
          setIsBottomSheetVisible(false);
        }}
        snapPoints={['50%']}
      />
    </View>
  );
}
