import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React, {memo, useState} from 'react';
import styled from 'styled-components';
import CustomText from '../Text/Text';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell} from '@fortawesome/free-regular-svg-icons';
import ProductResponse from '../../payload/response/ProductResponse';
import {BaseUrl} from '../../store/api/BaseApi';
import useThemeColors from '../../constant/useColor';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import AlertDialog from '../AlertDialog/AlertDialog';
import DailyPriceResponse from '../../payload/response/DailyPriceResponse';
import {useTrackPriceMutation} from '../../services/priceTrackingService';
import PriceTrackingResponse from '../../payload/response/PriceTrackingResponse';

interface PriceTrackingCardProps extends TouchableOpacityProps {
  item: PriceTrackingResponse;
}
const PriceTrackingCard = (props: PriceTrackingCardProps) => {
  const {user} = useSelector((state: RootState) => state.auth);
  const {firebaseToken} = useSelector((state: RootState) => state.app);
  const {item} = props;
  const colors = useThemeColors();
  const [selectedReminder, setSelectedReminder] = useState(true);

  return (
    <CardContainer activeOpacity={0.7} {...props}>
      <ProductImage
        resizeMode="cover"
        source={{uri: `${BaseUrl}/` + item.product.icon}}
      />
      <ProductContainer>
        <ProductHeader>
          <ProductName>{item.product.name}</ProductName>
          <ProductReminderButton
            hitSlop={10}
            activeOpacity={0.8}
            onPress={() => {}}
            theme={{
              background: selectedReminder ? colors.primary : 'transparent',
              borderColor: selectedReminder ? colors.primary : colors.primary,
            }}>
            <FontAwesomeIcon
              icon={faBell}
              size={12}
              color={!selectedReminder ? colors.primary : '#fff'}
            />
          </ProductReminderButton>
        </ProductHeader>
        <ProductInformation>
          <ProductUnit>{item.product.unit}</ProductUnit>
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

export default memo(PriceTrackingCard);
const CardContainer = styled(TouchableOpacity)`
  flex-direction: row;
  border-width: 1px;
  border-color: #ddd;
  padding: 10px;
  margin-vertical: 5px;
  border-radius: 5px;
  align-items: center;
  gap: 10px;
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
  background-color: ${props => props.theme.background};
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border-width: 1px;
  border-color: ${props => props.theme.borderColor};
`;
