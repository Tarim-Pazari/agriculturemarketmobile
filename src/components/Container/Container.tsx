import {View, Text, SafeAreaView} from 'react-native';
import useThemeColors from '../../constant/useColor';
import styled from 'styled-components';
import Header, {HeaderProps} from '../Header/Header';

interface ContainerProps extends HeaderProps {
  children?: React.ReactNode;
  header?: boolean;
  goBackShow?: boolean;
  gap?: number;
  m?: number;
  mr?: number;
  ml?: number;
  mt?: number;
  mb?: number;
  p?: number;
  pl?: number;
  pr?: number;
  pt?: number;
  pb?: number;
  bg?: string;
  mx?: number;
  my?: number;
  py?: number;
  px?: number;
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
}

export default function Container({
  children,
  header,
  goBackShow = false,
  bg,
  ...props
}: ContainerProps) {
  const colors = useThemeColors();
  return !header ? (
    <SafeViewContainer
      style={{
        backgroundColor: bg || colors.background,
      }}>
      <View
        style={{
          flex: 1,
          margin: props.m,
          marginRight: props.mr,
          marginLeft: props.ml,
          marginTop: props.mt,
          padding: props.p,
          paddingLeft: props.pl,
          paddingRight: props.pr,
          paddingTop: props.pt,
          paddingBottom: props.pb,
          gap: props.gap,
          marginHorizontal: props.mx,
          marginVertical: props.my,
          paddingHorizontal: props.px,
          paddingVertical: props.py,
          justifyContent: props.justifyContent,
          alignItems: props.alignItems,
        }}>
        {children}
      </View>
    </SafeViewContainer>
  ) : (
    <ViewContainer
      style={{
        backgroundColor: bg || colors.background,
      }}>
      {header && <Header {...props} goBackShow={goBackShow} />}
      <View
        style={{
          flex: 1,
          margin: props.m,
          marginRight: props.mr,
          marginLeft: props.ml,
          marginTop: props.mt,
          padding: props.p,
          paddingLeft: props.pl,
          paddingRight: props.pr,
          paddingTop: props.pt,
          paddingBottom: props.pb,
          gap: props.gap,
          marginHorizontal: props.mx,
          marginVertical: props.my,
          paddingHorizontal: props.px,
          paddingVertical: props.py,
          justifyContent: props.justifyContent,
          alignItems: props.alignItems,
        }}>
        {children}
      </View>
    </ViewContainer>
  );
}
const ViewContainer = styled(View)`
  flex: 1;
  background-color: ${props => props.theme.background};
`;
const SafeViewContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${props => props.theme.background};
`;
