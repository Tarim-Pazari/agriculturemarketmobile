import {View, Text} from 'react-native';
import React from 'react';
import Container from '../components/Container/Container';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';

export default function ProductScreen(
  props: NativeStackScreenProps<RootStackParamList, 'ProductScreen'>,
) {
  const {product} = props.route.params;
  return <Container goBackShow header title={product?.name}></Container>;
}
