import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../components/Container/Container';
import {AppDispatch} from '../store';
import {useDispatch} from 'react-redux';
import {AuthActions} from '../store/features/authReducer';

export default function UserScreen() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(AuthActions.logout());
  }, []);
  return <Container header title="Kullanıcı Bilgilerim"></Container>;
}
