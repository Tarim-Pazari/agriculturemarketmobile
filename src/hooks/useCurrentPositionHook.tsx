import {useCallback, useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {AppActions} from '../store/features/appReducer';
import useRequestLocationHook from './useRequestLocationHook';

export default function useCurrentPositionHook() {
  const dispatch: AppDispatch = useDispatch();
  const requestResult = useRequestLocationHook();
  const location = useSelector((state: RootState) => state.app.location);
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState(false);

  const getCurrentPosition = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDWYCTI8yo7w8BHdxlgEbmABI0boJXy-JQ`,
        )
          .then(response => response.json())
          .then(result => {
            let districtName = result.results[0].address_components.filter(
              (item: any) => item.types.includes('administrative_area_level_2'),
            )?.[0]?.long_name;
            let cityName = result.results[0].address_components.filter(
              (item: any) => item.types.includes('administrative_area_level_1'),
            )?.[0]?.long_name;
            dispatch(
              AppActions.setLocation({
                latitude,
                longitude,
                cityName,
                districtName,
                userSelection: {
                  cityId: null,
                  districtId: null,
                },
              }),
            );
          })
          .finally(() => setLoading(false));
      },
      error => {},
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
  const getFullAddress = useCallback(() => {
    if (location?.userSelection?.city && location?.userSelection?.district) {
      return `${location?.userSelection?.district?.name}, ${location?.userSelection?.city?.name}`;
    }
    return 'Konum Seçilmedi';
  }, [location]);
  const positionLoading = loading;
  return {...location, positionLoading, getFullAddress, permission};
}
