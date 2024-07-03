import {
  View,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CalendarProvider, WeekCalendar} from 'react-native-calendars';
import dayjs from 'dayjs';
import Input from '../components/Input/Input';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../components/ProductCard/ProductCard';
import useCurrentPositionHook from '../hooks/useCurrentPositionHook';

import AlertDialog from '../components/AlertDialog/AlertDialog';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import {
  useGetDailyPriceByIdsMutation,
  useGetDailyPriceMutation,
} from '../services/dailyPriceService';
import DailyPriceResponse from '../payload/response/DailyPriceResponse';
import DailyPriceRequest from '../payload/request/DailyPriceRequest';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import CustomFlatList from '../components/Flatlist/CustomFlatList';

import SelectCity from '../components/SelectCity/SelectCity';

export default function HomeScreen(
  props: NativeStackScreenProps<RootStackParamList>,
) {
  const userSelection = useSelector((state: RootState) => state.app.location);
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));
  const [items, setItems] = useState<Array<DailyPriceResponse>>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const [useGetDailyPriceByIds] = useGetDailyPriceByIdsMutation();
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
          height: Platform.OS === 'ios' ? 180 : 140,
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
      <SelectCity />
      <View style={{flex: 1, marginBottom: 60}}>
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
    </View>
  );
}
