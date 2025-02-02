import {View, TouchableOpacity, Platform} from 'react-native';
import React, {useState} from 'react';

import Container from '../components/Container/Container';
import Input from '../components/Input/Input';
import styled from 'styled-components';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import CustomText from '../components/Text/Text';
import Button from '../components/Button/Button';
import AppleSvg from '../assets/AppleSvg';
import GoogleSvg from '../assets/GoogleSvg';

import LoginRequest from '../payload/request/LoginRequest';
import AlertDialog from '../components/AlertDialog/AlertDialog';
import FormContainer, {FormContainerRef} from 'react-native-form-container';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import ErrorCode from '../firebase/ErrorCode';
import appleAuth from '@invertase/react-native-apple-authentication';
export default function LoginScreen(props: any) {
  const [loginRequest, setLoginRequest] = useState<LoginRequest>({
    email: '',
    password: '',
  });

  const ref = React.useRef<FormContainerRef>(null);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const {idToken, accessToken} = userInfo as any;
      console.log(idToken);
      const googleCredential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth().signInWithCredential(googleCredential);
      props.navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  const login = () => {
    let result = ref.current?.validate({
      email: 'E-posta adresi boş bırakılamaz',
      password: 'Şifre boş bırakılamaz',
    });
    if (result) {
      auth()
        .signInWithEmailAndPassword(loginRequest.email, loginRequest.password)
        .then(userCredential => {
          props.navigation.goBack();
        })
        .catch(error => {
          AlertDialog.showModal({
            title: 'Hata',
            message: ErrorCode(error.code),
          });
        });
    }
  };
  const configureAppleSignIn = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    auth()
      .signInWithCredential(appleCredential)
      .then(userCredential => {
        console.log(userCredential);
        props.navigation.goBack();
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <Container header title="Giriş Yap" goBackShow>
      <Form>
        <FormContainer style={{gap: 10}} formContainerRef={ref}>
          <Input
            autoCapitalize="none"
            id="email"
            value={loginRequest.email}
            onChangeText={text =>
              setLoginRequest({...loginRequest, email: text})
            }
            required
            icon={faEnvelope}
            placeholder="E-posta"
          />
          <Input
            required
            id="password"
            icon={faLock}
            placeholder="Şifre"
            secureTextEntry={true}
            value={loginRequest.password}
            onChangeText={text =>
              setLoginRequest({...loginRequest, password: text})
            }
          />
        </FormContainer>
        <ForgotPassword>
          <CustomText color="secondary">Şifremi Unuttum</CustomText>
        </ForgotPassword>
        <View style={{marginBottom: 10}}>
          <Button onPress={login} text="Giriş Yap" />
        </View>

        <HorizontalLine>
          <OtherOptionContainer>
            <CustomText color="secondary">veya</CustomText>
          </OtherOptionContainer>
        </HorizontalLine>
        <SocialMediaContainer>
          {Platform.OS === 'ios' && (
            <SocialButton
              onPress={configureAppleSignIn}
              activeOpacity={0.8}
              theme={{
                background: '#000',
              }}>
              <AppleSvg fill="#fff" />
            </SocialButton>
          )}
          <SocialButton
            onPress={signInWithGoogle}
            activeOpacity={0.8}
            theme={{
              background: '#E54134',
            }}>
            <GoogleSvg />
          </SocialButton>
        </SocialMediaContainer>
        <RegisterContainer>
          <RegisterTextContainer>
            <CustomText color="secondary">Hesabınız yok mu?</CustomText>
          </RegisterTextContainer>
          <Button
            onPress={() => {
              props.navigation.navigate('RegisterScreen');
            }}
            outline
            text="Kayıt Ol"
          />
        </RegisterContainer>
      </Form>
    </Container>
  );
}
const Form = styled(View)`
  margin-top: 20px;
  gap: 10px;
  margin-horizontal: 20px;
  flex: 1;
`;
const HorizontalLine = styled(View)`
  height: 1px;
  width: 100%;
  margin-top: 20px;
  background-color: #ddd;
`;
const RegisterContainer = styled(View)`
  margin-bottom: 30px;
  flex: 1;
  justify-content: flex-end;
`;
const RegisterTextContainer = styled(View)`
  margin-bottom: 10px;
  align-items: center;
`;
const ForgotPassword = styled(TouchableOpacity)`
  align-self: flex-start;
  margin-vertical: 10px;
`;
const OtherOptionContainer = styled(View)`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  top: -20px;
  left: 50%;
  margin-left: -20px;
  border-color: #ddd;
  background-color: #f9f9f9;
`;
const SocialMediaContainer = styled(View)`
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10px;
`;
const SocialButton = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${prop => prop.theme.background || '#fff'};
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;
