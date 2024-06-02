import React from 'react';
import Container from '../components/Container/Container';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

export default function ProductScreen(
  props: NativeStackScreenProps<RootStackParamList, 'ProductScreen'>,
) {
  const {product} = props.route.params;
  return (
    <Container
      goBackShow
      extraIcon={faExclamationTriangle}
      extraIconPress={() => {
        console.log('Extra Icon');
      }}
      header
      title={product?.name}></Container>
  );
}
