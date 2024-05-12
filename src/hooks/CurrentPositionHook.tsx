import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

export default function CurrentPositionHook() {
  const [cityName, setCityName] = useState('');

  useEffect(() => {
    getCurrentPosition();
    return () => {};
  }, []);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDWYCTI8yo7w8BHdxlgEbmABI0boJXy-JQ`,
        )
          .then(response => response.json())
          .then(result => {
            let cityName = result.results[0].address_components.filter(
              (item: any) => item.types.includes('administrative_area_level_1'),
            )?.[0]?.long_name;
            setCityName(cityName);
          });
      },
      error => {
        console.log('a');
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };
  return cityName;
}
