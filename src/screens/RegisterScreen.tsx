import {View, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Container from '../components/Container/Container';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import {faEnvelope, faUser} from '@fortawesome/free-regular-svg-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import {faLock, faPhone} from '@fortawesome/free-solid-svg-icons';
import CheckInput from '../components/CheckInput/CheckInput';
import {useRegisterMutation} from '../services/authService';
import SignUpRequest from '../payload/request/SignUpRequest';
import FormContainer, {
  FormContainerRef,
} from '../components/FormContainer/FormContainer';
import Buttons from '../components/Button/ButtonGroup';
import {useGetRolesMutation} from '../services/roleService';
import RoleResponse from '../payload/response/RoleResponse';
import CustomText from '../components/Text/Text';
import AlertDialog from '../components/AlertDialog/AlertDialog';

export default function RegisterScreen(
  props: NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>,
) {
  const [useRegister, result] = useRegisterMutation();
  const [signUpForm, setSignUpForm] = useState<SignUpRequest>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    roleId: 0,
  } as SignUpRequest);
  var ref = useRef<FormContainerRef>(null);
  const [checked, setChecked] = useState(false);
  const [againPassword, setAgainPassword] = useState('');
  const [roles, setRoles] = useState([] as RoleResponse[]);
  const [getRoles] = useGetRolesMutation();
  const [selectedRole, setSelectedRole] = useState({} as RoleResponse);
  useEffect(() => {
    getRoles()
      .unwrap()
      .then(res => {
        setRoles(res.list);
        setSignUpForm({...signUpForm, roleId: res.list[0].id});
        setSelectedRole(res.list[0]);
      })
      .catch(er => {
        console.log(er);
      });
  }, []);

  const handleSave = () => {
    ref.current?.setErrorDataFiels({});
    var errorMessages = {};
    if (!checked || signUpForm.password !== againPassword) {
      errorMessages = {
        ...errorMessages,
        contract: !checked ? 'Lütfen sözleşmeyi kabul ediniz.' : '',
        againPassword:
          signUpForm.password != againPassword ||
          signUpForm.password.length === 0
            ? 'Şifreler uyuşmuyor.'
            : '',
      };
    }

    ref.current?.setErrorDataFiels(errorMessages);
    useRegister(signUpForm)
      .unwrap()
      .then(res => {
        if (res.isSuccess) {
          setAgainPassword('');
          ref.current?.setErrorDataFiels({});
          setSignUpForm({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            roleId: 0,
          });
          AlertDialog.showModal({
            message: res.message,
            onConfirm: () => {
              props.navigation.goBack();
            },
          });
        }
      })
      .catch(er => {
        errorMessages = er.data;
        if (!checked || signUpForm.password !== againPassword) {
          errorMessages = {
            ...errorMessages,
            contract: !checked ? 'Lütfen sözleşmeyi kabul ediniz.' : '',
            againPassword:
              signUpForm.password != againPassword ||
              signUpForm.password.length === 0
                ? 'Şifreler uyuşmuyor.'
                : '',
          };
        }

        ref.current?.setErrorDataFiels(errorMessages);
      });
  };
  const handleChangeForm = (key: keyof SignUpRequest, value: string) => {
    setSignUpForm({...signUpForm, [key]: value});
  };

  return (
    <Container header title={'Kayıt Ol'} goBackShow>
      <Container m={20}>
        <ButtonGroupContainer>
          <Buttons
            datafield="description"
            buttons={roles}
            onPress={(index, selectedValue) => {
              setSelectedRole(selectedValue);
              setSignUpForm({...signUpForm, roleId: selectedValue.id});
            }}
          />
        </ButtonGroupContainer>
        <SloganContainer>
          <CustomText color="secondary">{selectedRole.slogan}</CustomText>
        </SloganContainer>
        <Form formContainerRef={ref}>
          <Input
            type="text"
            errorMessage=""
            id="firstName"
            value={signUpForm.firstName}
            onChangeText={text => handleChangeForm('firstName', text)}
            icon={faUser}
            placeholder="Ad"
          />
          <Input
            type="text"
            id="lastName"
            icon={faUser}
            placeholder="Soyad"
            value={signUpForm.lastName}
            onChangeText={text => handleChangeForm('lastName', text)}
          />
          <Input
            type="text"
            id="email"
            value={signUpForm.email}
            onChangeText={text => handleChangeForm('email', text)}
            autoCapitalize="none"
            icon={faEnvelope}
            placeholder="E-posta"
          />
          <Input
            type="text"
            id="phone"
            icon={faPhone}
            placeholder="Telefon"
            onChangeText={text => handleChangeForm('phone', text)}
            value={signUpForm.phone}
          />
          <Input
            type="text"
            id="password"
            icon={faLock}
            placeholder="Şifre"
            value={signUpForm.password}
            onChangeText={text => handleChangeForm('password', text)}
            secureTextEntry={true}
          />
          <Input
            errorMessage=""
            id="againPassword"
            type="text"
            value={againPassword}
            onChangeText={text => setAgainPassword(text)}
            icon={faLock}
            placeholder="Şifre Tekrar"
            secureTextEntry={true}
          />
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
          <Button onPress={handleSave} text="Kayıt Ol" />
        </Form>
      </Container>
    </Container>
  );
}
const Form = styled(FormContainer)`
  margin-top: 20px;
  gap: 10px;
  margin-horizontal: 20px;
`;
const ButtonGroupContainer = styled(View)`
  margin-bottom: 10px;
`;
const SloganContainer = styled(View)`
  margin-bottom: 10px;
`;
