import {View, Text, TouchableOpacity} from 'react-native';
import React, {forwardRef, useEffect, useState} from 'react';
import CustomBottomSheet, {BottomSheetRef} from './CustomBottomSheet';
import CustomFlatList from '../Flatlist/CustomFlatList';
import styled from 'styled-components';
import {AppDispatch, RootState} from '../../store';
import {useDispatch, useSelector} from 'react-redux';
import FirebaseTokenRequest from '../../payload/request/FirebaseTokenRequest';
import {useAddFirebaseTokenMutation} from '../../services/firebaseTokenService';
import CityResponse from '../../payload/response/CityResponse';
import useThemeColors from '../../constant/useColor';
import {AppActions} from '../../store/features/appReducer';
import CustomText from '../Text/Text';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {useGetCitiesMutation} from '../../services/citiesService';

interface CityListBottomSheetProps {
  close: () => void;
}

const CityListBottomSheet = forwardRef<
  BottomSheetRef,
  CityListBottomSheetProps
>((props, ref) => {
  const dispatch = useDispatch<AppDispatch>();
  const [addFcmToken] = useAddFirebaseTokenMutation();
  const [useGetCities] = useGetCitiesMutation();
  const fcmToken = useSelector((state: RootState) => state.app.firebaseToken);
  const [cities, setCities] = useState<Array<CityResponse>>([]);
  const [selectedCity, setSelectedCity] = useState({} as CityResponse);
  const colors = useThemeColors();

  useEffect(() => {
    getCities();
  }, []);
  const getCities = async () => {
    const response = await useGetCities();
    if (response.data) {
      setCities(response.data.list);
    }
  };
  const updateFirebaseToken = async (districtId: number) => {
    if (fcmToken != '') {
      let entity: FirebaseTokenRequest = {
        fcmToken: fcmToken as string,
        districtId: districtId,
      };
      addFcmToken(entity);
    }
  };

  return (
    <CustomBottomSheet ref={ref} snapPoints={['50%']}>
      <CustomFlatList
        renderItem={item => (
          <LanguageButton
            onPress={() => {
              if (Object.keys(selectedCity).length === 0) {
                setSelectedCity(item);
                return;
              } else {
                updateFirebaseToken(item.id);
                dispatch(
                  AppActions.setUserLocation({
                    cityId: selectedCity?.id,
                    districtId: item.id,
                    city: {
                      id: selectedCity.id,
                      name: selectedCity.name,
                    },
                    district: {
                      id: item.id,
                      name: item.name,
                    },
                  }),
                );
                props.close();
              }
            }}>
            <CustomText color="primary">{item.name}</CustomText>
            <FontAwesomeIcon icon={faAngleRight} color={colors.iconColor} />
          </LanguageButton>
        )}
        data={
          Object.keys(selectedCity).length === 0
            ? cities
            : selectedCity.districts
        }
      />
    </CustomBottomSheet>
  );
});
export default CityListBottomSheet;
const LanguageButton = styled(TouchableOpacity)`
  flex-direction: row;
  gap: 10px;
  align-items: center;
  margin-horizontal: 10px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  justify-content: space-between;
`;
