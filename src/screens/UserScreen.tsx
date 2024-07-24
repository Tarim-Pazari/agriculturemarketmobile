import React from 'react';
import Container from '../components/Container/Container';
import auth from '@react-native-firebase/auth';
import Col from '../components/ColItems/ColItem';
import CustomText from '../components/Text/Text';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {View} from 'react-native';
import AlertDialog from '../components/AlertDialog/AlertDialog';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
export default function UserScreen() {
  const {user} = useSelector((state: RootState) => state.auth);
  return (
    <Container p={10} header title="Profilim">
      <View style={{marginBottom: 10}}>
        <CustomText>{user?.fullName}</CustomText>
      </View>
      {user != null && (
        <Footer>
          <Col
            onPress={() => {
              AlertDialog.showLogoutModal(() => {
                auth().signOut();
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
