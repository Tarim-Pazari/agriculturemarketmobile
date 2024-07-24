import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import Cost from '../../models/Cost';
import styled from 'styled-components';
import CustomText from '../Text/Text';
import dayjs from 'dayjs';
import Helper from '../../helper/Helper';
import CalendarSvg from '../../assets/CalendarSvg';
import CostSvg from '../../assets/CostSvg';

interface CostItemCardProps
  extends React.ComponentProps<typeof TouchableOpacity> {
  item: Cost;
}

export default function CostItemCard(props: CostItemCardProps) {
  const totalCost = props.item.items.reduce((a, b) => {
    return a + Helper.formatNumber(b.price);
  }, 0);
  return (
    <Container {...props} activeOpacity={0.7}>
      <ColItem>
        <ColItem>
          <CalendarSvg />
          <CustomText color="primary">Tarih</CustomText>
        </ColItem>
        <CustomText>{dayjs(props.item.date).format('DD.MM.YYYY')}</CustomText>
      </ColItem>
      <ColItem>
        <ColItem>
          <CostSvg />
          <CustomText color="primary">Toplam Maliyet</CustomText>
        </ColItem>
        <CustomText color="default">
          {new Intl.NumberFormat('tr-TR', {
            currency: 'TRY',
            style: 'currency',
          }).format(totalCost)}
        </CustomText>
      </ColItem>
    </Container>
  );
}
const Container = styled(TouchableOpacity)`
  border-radius: 7px;
  padding-horizontal: 10px;
  padding-vertical: 10px;
  gap: 10px;
  margin-bottom: 10px;
  border-width: 1px;
  border-color: #f5f5f5;
  background-color: #fff;
`;
const ColItem = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
