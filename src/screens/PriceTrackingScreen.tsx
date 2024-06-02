import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../components/Container/Container';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {useAnonymusPriceTrackingMutation} from '../services/priceTrackingService';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import PriceTrackingResponse from '../payload/response/PriceTrackingResponse';
import ProductCard from '../components/ProductCard/ProductCard';
import PriceTrackingCard from '../components/PriceTrackingCard/PriceTrackingCard';
import CustomFlatList from '../components/Flatlist/CustomFlatList';

export default function PriceTrackingScreen(
  props: NativeStackScreenProps<RootStackParamList>,
) {
  const {firebaseToken} = useSelector((state: RootState) => state.app);
  const [usePriceTracking] = useAnonymusPriceTrackingMutation();
  const [trackingList, setTrackingList] = useState(
    [] as PriceTrackingResponse[],
  );
  const [search, setSearch] = useState('');
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      if (firebaseToken) {
        loadPriceTracking();
      }
    });
  }, []);

  const loadPriceTracking = () => {
    usePriceTracking({fcmToken: firebaseToken as string})
      .unwrap()
      .then(res => {
        console.log(res.list);
        setTrackingList(res.list);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Container goBackShow header title="Fiyat Takibi" p={10}>
      <CustomFlatList
        isSearchable
        filter={(entity, value) => {
          return entity.product.name
            .toLowerCase()
            .includes(value.toLowerCase());
        }}
        renderItem={(item, index) => {
          return (
            <PriceTrackingCard
              onPress={() => {
                props.navigation.navigate('ProductScreen', {
                  product: item.product,
                });
              }}
              item={item}
            />
          );
        }}
        data={trackingList?.filter?.(item => {
          return item?.product?.name
            ?.toLowerCase?.()
            .includes(search.toLowerCase());
        })}
      />
    </Container>
  );
}
