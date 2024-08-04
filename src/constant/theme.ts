import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const SIZES = {
  fontLg: 16,
  font: 14,
  fontSm: 13,
  fontXs: 12,

  //radius
  radius_sm: 8,
  radius: 12,
  radius_md: 18,
  radius_lg: 30,

  //space
  padding: 15,
  margin: 15,

  //Font Sizes

  //App dimensions
  width,
  height,
};
export const FONTSIZES = {
  default: 14,
  h1: 40,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
  body1: 30,
  body2: 24,
  body3: 20,
  body4: 16,
  body5: 14,
  body6: 12,
  caption1: 10,
  caption2: 8,
  description1: 12,
  description2: 10,
  description3: 8,
};
export const COLORS = {
  default: '#1F8505',
  primary: '#0D361A',
  secondary: '#143722',
  black: '#000',
  white: '#fff',
  link: '#e78577',
  grey: '#9B9B9B',
};
export const FONTWEIGHT = {
  bold: 'bold',
  normal: 'normal',
  light: 'light',
  thin: '100',
};
