import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import Container from '../components/Container/Container';
import OrderSvg from '../assets/OrderSvg';

import Col from '../components/ColItems/ColItem';

import {useSelector} from 'react-redux';
import {RootState} from '../store';
import AlertDialog from '../components/AlertDialog/AlertDialog';
import auth from '@react-native-firebase/auth';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import {View} from 'react-native';

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
      {/* <Col svg leftIcon={<ProductionSvg />} name="Satışlar" /> */}
      {user != null && (
        <Footer>
          <Col
            onPress={() => {
              AlertDialog.showLogoutModal(() => {
                auth().signOut();
                props.navigation.reset({
                  index: 0,
                  routes: [{name: 'BottomTabMenu'}],
                });
              });
            }}
            leftIcon={faRightFromBracket}
            name="Çıkış Yap"
          />
        </Footer>
      )}
    </Container>
  );
}
const Footer = styled(View)`
  flex: 1;
  justify-content: flex-end;
`;
