import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabParamList} from '../types/navigator';
import Container from '../components/Container/Container';
import MedicineSvg from '../assets/MedicineSvg';
import SeedlingSvg from '../assets/SeedlingSvg';
import CommissionSvg from '../assets/CommissionSvg';
import OrderSvg from '../assets/OrderSvg';
import FollowTrackingListSvg from '../assets/FollowTrackingListSvg';
import ProductionSvg from '../assets/ProductionSvg';
import Col from '../components/ColItems/ColItem';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {AuthActions} from '../store/features/authReducer';
import AlertDialog from '../components/AlertDialog/AlertDialog';

export default function MenuScreen(
  props: NativeStackScreenProps<BottomTabParamList, 'Menu'>,
) {
  const dispatch: AppDispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.auth);
  return (
    <Container p={10} gap={5} header title="Menü">
      <Col
        colDisabled={user == null}
        svg
        leftIcon={<ProductionSvg />}
        name="Üretiğim Ürünler"
      />
      <Col
        colDisabled={user == null}
        svg
        leftIcon={<OrderSvg />}
        name="Satışlarım"
      />
      <Col svg leftIcon={<FollowTrackingListSvg />} name="Fiyat Takip Listem" />
      <Col svg leftIcon={<CommissionSvg />} name="Komisyoncular" />
      <Col svg leftIcon={<MedicineSvg />} name="Zirai İlaçlar" />
      <Col svg leftIcon={<SeedlingSvg />} name="Fideler" />
      {user != null && (
        <Footer>
          <Col
            onPress={() => {
              AlertDialog.showLogoutModal(() => {
                dispatch(AuthActions.logout());
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
