import React, {useRef, useState} from 'react';
import Container from '../components/Container/Container';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import {faEnvelope, faUser} from '@fortawesome/free-regular-svg-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import {faLock, faPhone} from '@fortawesome/free-solid-svg-icons';
import CheckInput from '../components/CheckInput/CheckInput';

import User from '../models/User';
import UserRepository from '../repository/UserRepository';
import auth from '@react-native-firebase/auth';
import AlertDialog from '../components/AlertDialog/AlertDialog';
import ErrorCode from '../firebase/ErrorCode';
import FormContainer, {FormContainerRef} from 'react-native-form-container';
import {CommonActions} from '@react-navigation/native';
export default function RegisterScreen(
  props: NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>,
) {
  const repository = UserRepository.getInstance();
  var ref = useRef<FormContainerRef>(null);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerDto, setRegisterDto] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  return (
    <Container header title={'Kayıt Ol'} goBackShow>
      <Form formContainerRef={ref}>
        <Input
          required
          id="firstName"
          icon={faUser}
          placeholder="Ad"
          value={registerDto.firstName}
          onChangeText={text => {
            setRegisterDto({...registerDto, firstName: text});
          }}
        />
        <Input
          value={registerDto.lastName}
          onChangeText={text => {
            setRegisterDto({...registerDto, lastName: text});
          }}
          required
          id="lastName"
          icon={faUser}
          placeholder="Soyad"
        />
        <Input
          required
          id="email"
          autoCapitalize="none"
          icon={faEnvelope}
          placeholder="E-posta"
          value={registerDto.email}
          validation="email"
          onChangeText={text => {
            setRegisterDto({...registerDto, email: text});
          }}
        />
        <Input
          required
          id="phone"
          icon={faPhone}
          validation="phone"
          keyboardType="phone-pad"
          value={registerDto.phone}
          onChangeText={text => {
            setRegisterDto({...registerDto, phone: text});
          }}
          placeholder="Telefon"
        />
        <Input
          required
          id="password"
          icon={faLock}
          placeholder="Şifre"
          secureTextEntry={true}
          value={registerDto.password}
          onChangeText={text => {
            setRegisterDto({...registerDto, password: text});
          }}
        />
      </Form>
      <Container gap={10} mx={20} mt={20}>
        <CheckInput
          id="contract"
          type="checkbox"
          errorMessage=""
          checked={checked}
          onPress={() => setChecked(!checked)}
          label="Gizlilik ve Kullanım Koşullarını okudum kabul ediyorum."
          clickedLabel="Gizlilik ve Kullanım Koşullarını"
          clickLabel={() => console.log('clicked')}
        />
        <Button
          loading={loading}
          onPress={() => {
            let result = ref.current?.validate({
              firstName: 'Lütfen adınızı giriniz.',
              lastName: 'Lütfen soyadınızı giriniz.',
              email: 'Lütfen e-posta adresinizi giriniz.',
              phone: 'Lütfen telefon numaranızı giriniz.',
              password: 'Lütfen şifrenizi giriniz.',
            });
            if (!result) {
              return;
            }
            setLoading(true);
            auth()
              .createUserWithEmailAndPassword(
                registerDto.email,
                registerDto?.password as string,
              )
              .then(userCredential => {
                var user = userCredential.user;
                registerDto.id = user?.uid;
                repository.addUser(registerDto).then(() => {
                  setLoading(false);
                  AlertDialog.showModal({
                    isAutoClose: false,
                    title: 'Başarılı',
                    message: 'Kayıt işlemi başarılı bir şekilde gerçekleşti.',
                    onConfirm: () => {
                      props.navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [{name: 'Home'}],
                        }),
                      );
                      props.navigation.navigate('BottomTabMenu');
                    },
                  }).finally(() => {
                    setLoading(false);
                  });
                });
              })
              .catch(error => {
                AlertDialog.showModal({
                  isAutoClose: false,
                  title: 'Hata',
                  message: ErrorCode(error.code),
                });
                setLoading(false);
              });
          }}
          text="Kayıt Ol"
        />
      </Container>
    </Container>
  );
}
const Form = styled(FormContainer)`
  margin-top: 20px;
  gap: 10px;
  margin-horizontal: 20px;
`;
