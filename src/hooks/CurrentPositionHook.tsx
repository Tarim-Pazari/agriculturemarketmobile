import {View, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

export default function CurrentPositionHook() {
  const [loading, setLoading] = useState(true);
  const [cityName, setCityName] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    getCurrentPosition();
    return () => {};
  }, []);

  const getCurrentPosition = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setPosition({
          latitude,
          longitude,
        });
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
            setDistrictName(districtName);
            setCityName(cityName);
          })
          .finally(() => setLoading(false));
      },
      error => {
        console.log('a');
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
  const getFullAddress = useCallback(() => {
    return `${districtName}, ${cityName}`;
  }, [cityName, districtName]);
  const positionLoading = loading;
  return {cityName, position, positionLoading, districtName, getFullAddress};
}
