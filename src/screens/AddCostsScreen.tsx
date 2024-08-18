import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../components/Container/Container';
import CheckInput from '../components/CheckInput/CheckInput';
import styled from 'styled-components';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import useThemeColors from '../constant/useColor';
import Helper from '../helper/Helper';
import Cost from '../models/Cost';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import CostItem from '../models/CostItem';
import FormKeyboardView from '../components/FormKeyboardView/FormKeyboardView';
import FormContainer, {FormContainerRef} from 'react-native-form-container';
import AlertDialog from '../components/AlertDialog/AlertDialog';
import CostRepository from '../repository/CostRepository';
import CustomText from '../components/Text/Text';

const CostsNames = ['Personel Giderleri', 'Mazot', 'İlaç-Gübre', 'Fide'];

export default function AddCostsScreen(props: any) {
  const InitialCost = {
    date: dayjs().format('YYYY-MM-DD'),
    items: CostsNames.map(name => {
      return {
        name,
        price: 0,
      };
    }),
    userId: '',
  };
  const costRepository = CostRepository.getInstance();
  const user = useSelector((state: RootState) => state.auth.user);
  const colors = useThemeColors();
  const [costDto, setCostDto] = useState<Cost>(InitialCost);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setCostDto(InitialCost);
    });
    return () => {
      setCostDto(InitialCost);
    };
  }, []);

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
  const handleSave = () => {
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
    setLoading(true);

    costRepository.addCost({...costDto, userId: user?.uid || ''}).then(() => {
      setLoading(false);

      AlertDialog.showModal({
        isAutoClose: false,
        title: 'Başarılı',
        type: 'success',
        message: 'Maliyetleriniz başarıyla kaydedildi.',
        onConfirm() {
          props.navigation.goBack();
          setCostDto(InitialCost);
        },
      }).catch(() => {
        setLoading(false);
        AlertDialog.showModal({
          title: 'Hata',
          message:
            'Maliyetleriniz kaydedilirken bir hata oluştu. Lütfen tekrar deneyiniz.',
        });
      });
    });
  };
  return (
    <Container p={10} header title="Maliyet Ekle" goBackShow>
      <Container>
        <FormKeyboardView gap={10}>
          {costDto.items.length === 0 && (
            <Container justifyContent="center" alignItems="center">
              <CustomText center>
                Maliyet eklemek için aşağıdaki butona tıklayınız.
              </CustomText>
            </Container>
          )}
          {costDto.items.map((item, index) => {
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
                    priceInput
                    id={`cost-price-${index}`}
                    required
                    keyboardType="numeric"
                    onFocus={() => {
                      if (item.price?.toString() === '0') {
                        handleCostChange(index, 'price', '');
                      }
                    }}
                    onChangeValue={value =>
                      handleCostChange(index, 'price', value as any)
                    }
                    value={item.price.toString()}
                    placeholder="Fiyat"
                  />
                </ColItem>
                <ColItem theme={{flex: 0.4}}>
                  <Button
                    onPress={() => handleDeleteCostItem(index)}
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
              date: dayjs().format('YYYY-MM-DD'),
              items: [
                ...costDto.items,
                {
                  name: '',
                  price: 0,
                },
              ],
              userId: user?.uid || '',
            });
          }}
          text="Maliyet Ekle"
          textColor={colors.primary}
          backgroundColor={colors.secondary}
          style={{flex: 1}}
        />
        {costDto.items.length !== 0 && (
          <Button
            loading={loading}
            onPress={handleSave}
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
