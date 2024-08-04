import {View, TouchableOpacity, Keyboard} from 'react-native';
import React, {useRef} from 'react';
import styled from 'styled-components';
import CustomText from '../Text/Text';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import useCurrentPositionHook from '../../hooks/useCurrentPositionHook';
import {RootState} from '../../store';
import {useSelector} from 'react-redux';
import {BottomSheetRef} from '../BottomSheet/CustomBottomSheet';

export default function SelectCity({
  locationBottomSheetRef,
}: {
  locationBottomSheetRef: React.RefObject<BottomSheetRef>;
}) {
  const {positionLoading} = useCurrentPositionHook();
  const location = useSelector((state: RootState) => state.app.location);
  const userSelection = location;

  return (
    <>
      <LanguageButton
        activeOpacity={0.8}
        onPress={() => {
          let keyboardStatus = Keyboard.isVisible();
          if (keyboardStatus) {
            Keyboard.dismiss();
          }
          locationBottomSheetRef?.current?.open();
        }}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <FontAwesomeIcon icon={faMapMarkerAlt} color="blue" />
          {userSelection?.city && userSelection?.district ? (
            <CustomText color="primary">
              {`${userSelection?.district?.name}, ${userSelection?.city?.name}`}
            </CustomText>
          ) : (
            <CustomText color="primary">Konum Seçilmedi</CustomText>
          )}
        </View>
        {!positionLoading && (
          <CustomText color="grey">
            {!userSelection ? 'Konum Seç' : 'Değiştir'}
          </CustomText>
        )}
      </LanguageButton>
    </>
  );
}
const LanguageButton = styled(TouchableOpacity)`
  flex-direction: row;
  gap: 10px;
  align-items: center;
  margin-horizontal: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  justify-content: space-between;
`;
