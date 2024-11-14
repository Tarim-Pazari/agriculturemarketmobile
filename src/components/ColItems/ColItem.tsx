import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import useThemeColors from '../../constant/useColor';
import CustomText from '../Text/Text';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

interface ColProps extends TouchableOpacityProps {
  name: string;
  leftIcon?: any;
  svg?: boolean;
  rightIconShowHide?: boolean;
  colDisabled?: boolean;
  backgroundColor?: string;
}
const Col = ({
  name,
  leftIcon,
  svg = false,
  rightIconShowHide = false,
  colDisabled = false,
  backgroundColor,
  ...props
}: ColProps) => {
  const colors = useThemeColors();
  return (
    <ColItem
      backgroundColor={backgroundColor}
      theme={{
        opacity: colDisabled ? 0.3 : 1,
      }}
      {...props}
      hitSlop={10}
      disabled={colDisabled}
      activeOpacity={0.7}>
      <ColLeftContainer>
        {svg && leftIcon && leftIcon}
        {!svg && leftIcon && (
          <FontAwesomeIcon icon={leftIcon} color={colors.iconColor} />
        )}
        <CustomText color="primary">{name}</CustomText>
      </ColLeftContainer>
      {!rightIconShowHide && (
        <FontAwesomeIcon icon={faAngleRight} color={colors.iconColor} />
      )}
    </ColItem>
  );
};
export default Col;
const ColItem = styled(TouchableOpacity)<{backgroundColor?: string}>`
  border-radius: 7px;
  padding-horizontal: 7px;
  padding-vertical: 10px;
  flex-direction: row;
  justify-content: space-between;
  border-width: 1px;
  border-color: #f5f5f5;
  background-color: ${props => props.backgroundColor || '#fff'};
  opacity: ${props => props.theme.opacity};
`;
const ColLeftContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const styles = StyleSheet.create({
  test: {
    backgroundColor: 'red',
    height: 20,
    width: 20,
  },
});
