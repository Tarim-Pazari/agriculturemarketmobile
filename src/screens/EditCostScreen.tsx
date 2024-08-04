import React, {useState} from 'react';
import Container from '../components/Container/Container';
import CustomText from '../components/Text/Text';
import styled from 'styled-components';
import {View} from 'react-native';
import FormKeyboardView from '../components/FormKeyboardView/FormKeyboardView';
import FormContainer from 'react-native-form-container';
import Button from '../components/Button/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigator';
import Input from '../components/Input/Input';
import CostItem from '../models/CostItem';
import useThemeColors from '../constant/useColor';
import Helper from '../helper/Helper';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

import {useSelector} from 'react-redux';
import {RootState} from '../store';
import AlertDialog from '../components/AlertDialog/AlertDialog';

import CostRepository from '../repository/CostRepository';

export default function EditCostScreen(
  props: NativeStackScreenProps<RootStackParamList, 'EditCostScreen'>,
) {
  const costRepository = CostRepository.getInstance();
  const cost = props.route.params.item;
  const colors = useThemeColors();
  const [costDto, setCostDto] = useState(cost);
  const [loading, setLoading] = useState(false);

  const handleCostChange = (
    index: number,
    name: keyof CostItem,
    value: string,
  ) => {
    const newCostDto = {...costDto};
    newCostDto.items[index] = {
      ...newCostDto.items[index],
      [name]: value,
    };
    setCostDto(newCostDto);
  };

  const handleDeleteCostItem = (index: number) => {
    const newCostDto = {...costDto};
    newCostDto.items.splice(index, 1);
    setCostDto(newCostDto);
  };
  const handleDeleteCost = () => {
    if (cost.id) {
      costRepository
        .deleteCost(cost.id)
        .then(() => {
          props.navigation.goBack();
        })
        .catch(er => {
          AlertDialog.showModal({
            title: 'Hata',
            message: 'Maliyet silinirken bir hata oluştu.',
          });
        });
    }
  };
  const handleUpdateCost = () => {
    let checkPriceOrName = costDto.items.some(
      item => item.name === '' || item.price === 0,
    );
    if (checkPriceOrName) {
      AlertDialog.showModal({
        title: 'Hata',
        message: 'Lütfen tüm alanları doldurunuz.',
      });
      return;
    }
    costRepository
      .updateCost(costDto)
      .then(() => {
        AlertDialog.showModal({
          type: 'success',
          message: 'Maliyet başarıyla güncellendi.',
          onConfirm() {
            props.navigation.goBack();
          },
        });
      })
      .catch(() => {
        AlertDialog.showModal({
          title: 'Hata',
          message: 'Maliyet güncellenirken bir hata oluştu.',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Container
      extraIcon={faTrash}
      extraIconPress={() => {
        AlertDialog.showModal({
          title: 'Uyarı',
          message: 'Maliyeti kalıcı olarak silmek istediğinize emin misiniz?',
          onCancel() {
            AlertDialog.dismiss();
          },
          onConfirm() {
            handleDeleteCost();
          },
        });
      }}
      header
      title="Maliyet Detayı"
      goBackShow
      p={10}>
      <Container>
        <FormKeyboardView gap={10}>
          {costDto?.items?.map((item, index) => {
            return (
              <Col key={index}>
                <ColItem>
                  <Input
                    id={`cost-${index}`}
                    required
                    value={item.name}
                    onChangeText={value =>
                      handleCostChange(index, 'name', value)
                    }
                    placeholder="Maliyet"
                  />
                </ColItem>
                <ColItem theme={{flex: 0.7}}>
                  <Input
                    id={`cost-price-${index}`}
                    required
                    keyboardType="numeric"
                    onFocus={() => {
                      if (item.price?.toString() === '0') {
                        handleCostChange(index, 'price', '');
                      }
                    }}
                    onChangeText={value =>
                      handleCostChange(
                        index,
                        'price',
                        Helper.formatPrice(value),
                      )
                    }
                    value={item.price.toString()}
                    placeholder="Fiyat"
                  />
                </ColItem>
                <ColItem theme={{flex: 0.4}}>
                  <Button
                    onPress={() => {
                      if (item.price?.toString() === '0' && item.name === '') {
                        handleDeleteCostItem(index);
                        return;
                      }
                      AlertDialog.showModal({
                        title: 'Uyarı',
                        message: 'Maliyeti silmek istediğinize emin misiniz?',
                        onConfirm() {
                          handleDeleteCostItem(index);
                        },
                        onCancel() {
                          AlertDialog.dismiss();
                        },
                      });
                    }}
                    outline
                    style={{
                      borderColor: 'transparent',
                    }}
                    icon={faTrash}
                  />
                </ColItem>
              </Col>
            );
          })}
        </FormKeyboardView>
      </Container>
      <Footer>
        <Button
          onPress={() => {
            setCostDto({
              ...costDto,
              items: [
                ...costDto.items,
                {
                  name: '',
                  price: 0,
                },
              ],
            });
          }}
          text="Maliyet Ekle"
          textColor={colors.primary}
          backgroundColor={colors.secondary}
          style={{flex: 1}}
        />
        {costDto.items.length !== 0 && (
          <Button
            onPress={handleUpdateCost}
            loading={loading}
            text="Kaydet"
            textColor={colors.secondary}
            backgroundColor={colors.primary}
            style={{flex: 1}}
          />
        )}
      </Footer>
    </Container>
  );
}
const Col = styled(View)`
  flex-direction: row;
  gap: 10px;
`;
const ColItem = styled(View)`
  flex: ${props => props.theme.flex || 1};
`;
const Footer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 30px;
`;
