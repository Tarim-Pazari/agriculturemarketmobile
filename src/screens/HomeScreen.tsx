import {View, ActivityIndicator, Platform, Text} from 'react-native';
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
import ProductResponse from '../payload/response/ProductResponse';

export default function HomeScreen(
  props: NativeStackScreenProps<RootStackParamList>,
) {
  const [useGetDailyPriceByIds] = useGetDailyPriceByIdsMutation();
  const locationBottomSheetRef = useRef<BottomSheetRef>(null);
  const location = useSelector((state: RootState) => state.app.location);
  const userSelection = location;

  const [selectedDay, setSelectedDay] = useState(dayjs().format('YYYY-MM-DD'));
  const [items, setItems] = useState<Array<DailyPriceResponse>>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

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
        disabledOnPress={loading}
      />
      <SelectCity locationBottomSheetRef={locationBottomSheetRef} />

      <View
        style={{
          flex: 1,
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
            <>
              <CustomFlatList
                notFoundText="Ürün Bulunamadı"
                handleRefresh={loadData}
                renderItem={(item, index) => {
                  return <ProductCard item={item} />;
                }}
                sort={(a: DailyPriceResponse, b: DailyPriceResponse) =>
                  a.cityName.localeCompare(b.cityName)
                }
                filter={(item, value, index) => {
                  return item?.name
                    ?.toLowerCase?.()
                    .includes(value.toLowerCase());
                }}
                isSearchable
                data={items}
              />
            </>
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
