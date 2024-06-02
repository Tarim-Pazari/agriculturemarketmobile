import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PERMISSIONS, check} from 'react-native-permissions';

export default function useRequestLocationHook() {
  const [result, setResult] = useState('');

  useEffect(() => {
    checkLocationPermission();
    requestLocation();
    return () => {};
  }, []);

  const checkLocationPermission = () => {
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
      setResult(result);
    });
  };
  const requestLocation = async () => {
    const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    setResult(result);
  };

  return result;
}
