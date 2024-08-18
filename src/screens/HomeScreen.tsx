import {View, ActivityIndicator, Platform} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import dayjs from 'dayjs';

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
import {BottomSheetRef} from '../components/BottomSheet/CustomBottomSheet';
import CityListBottomSheet from '../components/BottomSheet/CityListBottomSheet';
import CalendarComponent from '../components/CalendarComponents';

export default function HomeScreen(
  props: NativeStackScreenProps<RootStackParamList>,
) {
  const location = useSelector((state: RootState) => state.app.location);
  const userSelection = location;
  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));
  const [items, setItems] = useState<Array<DailyPriceResponse>>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
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
      console.log(entity);
      useGetDailyPriceByIds(entity)
        .unwrap()
        .then(response => {
          if (response?.list?.length !== 0) {
            console.log(response.list[0]);
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
      <CalendarComponent
        search={search}
        setSearch={setSearch}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
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
