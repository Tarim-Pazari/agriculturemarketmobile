import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabParamList, RootStackParamList} from '../types/navigator';
import Container from '../components/Container/Container';
import OrderSvg from '../assets/OrderSvg';

import Col from '../components/ColItems/ColItem';

import styled from 'styled-components';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import AlertDialog from '../components/AlertDialog/AlertDialog';

export default function MenuScreen(
  props: NativeStackScreenProps<RootStackParamList>,
) {
  const {user} = useSelector((state: RootState) => state.auth);
  return (
    <Container p={10} gap={5} header title="Menü">
      <Col
        onPress={() => {
          if (user == null) {
            AlertDialog.showLoginModal(
              () => {
                props.navigation.navigate('LoginScreen');
              },
              () => {
                props.navigation.navigate('RegisterScreen');
              },
            );
          } else {
            props.navigation.navigate('CostsScreen');
          }
        }}
        svg
        leftIcon={<OrderSvg />}
        name="Maliyetler"
      />
    </Container>
  );
}
