import {View, Text, TouchableOpacity, Keyboard} from 'react-native';
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
import {useAddFirebaseTokenMutation} from '../../services/firebaseTokenService';
import FirebaseTokenRequest from '../../payload/request/FirebaseTokenRequest';

export default function SelectCity({refRBSheet}: {refRBSheet: any}) {
  const {positionLoading} = useCurrentPositionHook();
  const dispatch = useDispatch<AppDispatch>();
  const [addFcmToken] = useAddFirebaseTokenMutation();
  const [useGetCities] = useGetCitiesMutation();
  const fcmToken = useSelector((state: RootState) => state.app.firebaseToken);
  const location = useSelector((state: RootState) => state.app.location);
  const [cities, setCities] = useState<Array<CityResponse>>([]);
  const [selectedCity, setSelectedCity] = useState({} as CityResponse);
  const colors = useThemeColors();
  const userSelection = location;

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (opened) {
      getCities();
    }
  }, [opened]);
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
    <>
      <LanguageButton
        activeOpacity={0.8}
        onPress={() => {
          let keyboardStatus = Keyboard.isVisible();
          if (keyboardStatus) {
            Keyboard.dismiss();
          }
          setOpened(true);
          refRBSheet?.current?.open();
        }}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <FontAwesomeIcon icon={faMapMarkerAlt} color="blue" />
          {userSelection?.city && userSelection?.district ? (
            <CustomText color="primary">
              {`${userSelection?.district?.name}, ${userSelection?.city?.name}`}
            </CustomText>
          ) : (
            <CustomText color="primary">Konum Seçilmedi</CustomText>
          )}
        </View>
        {!positionLoading && (
          <CustomText color="grey">
            {!userSelection ? 'Konum Seç' : 'Değiştir'}
          </CustomText>
        )}
      </LanguageButton>
      <RBSheet
        ref={refRBSheet}
        draggable
        onClose={() => {
          setSelectedCity({} as CityResponse);
          setOpened(false);
        }}
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
                  refRBSheet?.current?.close();
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
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  justify-content: space-between;
`;
