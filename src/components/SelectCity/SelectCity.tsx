import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import CustomText from '../Text/Text';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleRight, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import useCurrentPositionHook from '../../hooks/useCurrentPositionHook';
import RBSheet from 'react-native-raw-bottom-sheet';
import {COLORS} from '../../constant/theme';
import {useGetCitiesMutation} from '../../services/citiesService';
import CityResponse from '../../payload/response/CityResponse';
import useThemeColors from '../../constant/useColor';
import CustomFlatList from '../Flatlist/CustomFlatList';
import {AppDispatch, RootState} from '../../store';
import {useDispatch, useSelector} from 'react-redux';
import {AppActions} from '../../store/features/appReducer';

export default function SelectCity() {
  const {positionLoading, getFullAddress, permission, cityName} =
    useCurrentPositionHook();
  const [useGetCities] = useGetCitiesMutation();
  const dispatch: AppDispatch = useDispatch();

  const {location} = useSelector((state: RootState) => state.app);

  const [cities, setCities] = useState<Array<CityResponse>>([]);

  const colors = useThemeColors();
  const refRBSheet = useRef<any>(null);

  useEffect(() => {
    getCities();
  }, []);
  const getCities = async () => {
    const response = await useGetCities();
    if (response.data) {
      setCities(response.data.list);
      let findCity = response.data.list.find(
        x => x.name.toLowerCase() === cityName?.toLowerCase(),
      );
    }
  };
  return (
    <>
      <LanguageButton
        activeOpacity={0.8}
        onPress={() => {
          refRBSheet?.current?.open();
        }}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <FontAwesomeIcon icon={faMapMarkerAlt} color="blue" />
          {!positionLoading ? (
            <CustomText color="primary">{getFullAddress()}</CustomText>
          ) : (
            <CustomText color="primary">
              {permission && 'Lütfen konum seçiniz'}
            </CustomText>
          )}
        </View>
        {!positionLoading && (
          <CustomText color="grey">
            {!permission ? 'Konum Seç' : 'Değiştir'}
          </CustomText>
        )}
      </LanguageButton>
      <RBSheet
        ref={refRBSheet}
        draggable
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          draggableIcon: {
            backgroundColor: COLORS.grey,
          },
          container: {
            backgroundColor: '#f9f9f9',
            paddingVertical: 10,
          },
        }}
        height={400}
        customModalProps={{
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: true,
        }}>
        <CustomFlatList
          renderItem={item => (
            <LanguageButton
              onPress={() => {
                let findCity = cities.find(
                  x => x.id == location?.userSelection?.cityId,
                );
                let findDistrict = findCity?.districts.find(
                  x => x.id == item.id,
                );
                dispatch(
                  AppActions.setUserLocation({
                    cityId: location?.userSelection?.cityId,
                    districtId: item.id,
                    city: {
                      id: findCity?.id,
                      name: findCity?.name,
                    },
                    district: {
                      id: findDistrict?.id,
                      name: findDistrict?.name,
                    },
                  }),
                );
                refRBSheet?.current?.close();
              }}>
              <CustomText color="primary">{item.name}</CustomText>
              <FontAwesomeIcon icon={faAngleRight} color={colors.iconColor} />
            </LanguageButton>
          )}
          data={
            location != null && location?.userSelection?.cityId != null
              ? cities.find(x => x.id == location.userSelection.cityId)
                  ?.districts ?? []
              : cities
          }
        />
      </RBSheet>
    </>
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
