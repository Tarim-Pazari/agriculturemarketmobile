import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../components/Container/Container';
import CostRepository from '../repository/CostRepository';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import styled from 'styled-components';
import Button from '../components/Button/Button';
import CustomText from '../components/Text/Text';
import Cost from '../models/Cost';
import CustomFlatList from '../components/Flatlist/CustomFlatList';
import CostItemCard from '../components/CostItemCard/CostItemCard';
import Loading from '../components/Loading/Loading';

export default function CostsScreen(props: any) {
  const user = useSelector((state: RootState) => state.auth.user);
  const costRepository = CostRepository.getInstance();
  const [costs, setCosts] = useState<Array<Cost>>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    props.navigation.addListener('focus', loadCosts);
    return () => {
      setLoading(true);
      setCosts([]);
    };
  }, []);
  const loadCosts = () => {
    costRepository
      .getCostsByUserId(user?.uid ?? '')
      .then(res => {
        setCosts(res);
      })
      .finally(() => setLoading(false));
  };
  return (
    <Container p={10} header goBackShow title="Maliyetler">
      <Loading loading={loading}>
        <Container>
          <CustomFlatList
            data={costs}
            notFoundText="Maliyet bulunamadı. Maliyet eklemek için Maliyet Ekle butonuna tıklayınız."
            renderItem={(item, index) => {
              return (
                <CostItemCard
                  onPress={() => {
                    props.navigation.navigate('EditCostScreen', {item});
                  }}
                  item={item}
                />
              );
            }}
          />
        </Container>

        <Footer>
          <Button
            outline
            text="Maliyet Ekle"
            onPress={() =>
              props.navigation.navigate('AddCostsScreen')
            }></Button>
        </Footer>
      </Loading>
    </Container>
  );
}

const Footer = styled(View)`
  margin-bottom: 30px;
  margin-top: 10px;
`;
