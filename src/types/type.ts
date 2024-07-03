import {COLORS, FONTSIZES} from '../constant/theme';
import CityResponse from '../payload/response/CityResponse';

const colorKeys = Object.keys(COLORS) as (keyof typeof COLORS)[];
export type ColorType = (typeof colorKeys)[number];

const fontKeys = Object.keys(FONTSIZES) as (keyof typeof FONTSIZES)[];
export type FontSizeType = (typeof fontKeys)[number];

export type SvgType = {
  fill?: string;
  height?: number;
  width?: number;
};
