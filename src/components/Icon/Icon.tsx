import {View, Text} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import useThemeColors from '../../constant/useColor';

interface IconProps {
  icon: IconProp;
  size?: number;
  color?: string;
}

export default function Icon({icon, size = 20, color}: IconProps) {
  const colors = useThemeColors();
  return (
    <FontAwesomeIcon
      icon={icon}
      color={color || colors.iconColor}
      size={size}
    />
  );
}
