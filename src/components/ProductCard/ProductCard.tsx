import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {memo, useState} from 'react';
import styled from 'styled-components';
import CustomText from '../Text/Text';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell} from '@fortawesome/free-regular-svg-icons';
import ProductResponse from '../../payload/response/ProductResponse';

const ProductCard = (props: {item: ProductResponse}) => {
  const {item} = props;
  const [selectedReminder, setSelectedReminder] = useState(false);
  return (
    <CardContainer>
      <ProductImage
        resizeMode="cover"
        source={{uri: 'http://192.168.1.140:8080/' + item.icon}}
      />
      <ProductContainer>
        <ProductHeader>
          <ProductName>{item.name}</ProductName>
          <ProductReminderButton
            activeOpacity={0.8}
            onPress={() => setSelectedReminder(!selectedReminder)}
            theme={{
              selected: selectedReminder,
            }}>
            <FontAwesomeIcon
              icon={faBell}
              size={12}
              color={selectedReminder ? '#FFF' : '#fab421'}
            />
          </ProductReminderButton>
        </ProductHeader>
        <ProductInformation>
          <ProductUnit>{item.unit}</ProductUnit>
          <ProductPrices>
            <ProductMinPrice>
              {new Intl.NumberFormat('tr-TR', {
                style: 'currency',
                currency: 'TRY',
              }).format(item.minPrice)}
            </ProductMinPrice>
            <ProductMaxPrice>
              {new Intl.NumberFormat('tr-TR', {
                style: 'currency',
                currency: 'TRY',
              }).format(item.maxPrice)}
            </ProductMaxPrice>
          </ProductPrices>
        </ProductInformation>
      </ProductContainer>
    </CardContainer>
  );
};

export default memo(ProductCard);
const CardContainer = styled(View)`
  flex-direction: row;
  border-width: 1px;
  border-color: #ddd;
  padding: 10px;
  margin-vertical: 5px;
  border-radius: 5px;
  align-items: center;
  gap: 10px;
  margin-horizontal: 10px;
  box-shadow: 3px 3px 3px #ddd;
  background-color: #fff;
`;
const ProductContainer = styled(View)`
  flex: 1;
  gap: 8px;
`;
const ProductInformation = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;
const ProductImage = styled(Image)`
  width: 50px;
  height: 50px;
`;
const ProductHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;
const ProductName = styled(CustomText)`
  font-size: 13px;
  color: #444;
  font-weight: bold;
`;
const ProductUnit = styled(CustomText)`
  font-size: 11px;
  color: #4e4e4e;
`;
const ProductPrices = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  padding: 3px;
  align-items: center;
`;
const ProductMinPrice = styled(CustomText)`
  font-size: 11px;
  color: #ef0606;
`;
const ProductMaxPrice = styled(CustomText)`
  font-size: 11px;
  color: #60a918;
`;
const ProductReminderButton = styled(TouchableOpacity)`
  height: 20px;
  width: 20px;
  background-color: ${props => (props.theme.selected ? '#fab421' : '#FFF')};
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border-width: 1px;
  border-color: #fab421;
`;
