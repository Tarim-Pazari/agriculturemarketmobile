import {View, Text, Image, Dimensions} from 'react-native';
import React from 'react';
import useThemeColors from '../constant/useColor';
import Container from '../components/Container/Container';
import CustomText from '../components/Text/Text';

export default function SplashScreen() {
  const colors = useThemeColors();
  return (
    <Container bg={colors.primary}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../assets/logo/logo.png')}
          style={{
            height: 200,
            width: Dimensions.get('window').width / 2,
          }}
        />
        <CustomText fontSizes="default" color="white">
          Uygulamamız yapım aşamasındadır.
        </CustomText>
      </View>
    </Container>
  );
}
