import useColorScheme from './useColorScheme';

const Colors = {
  light: {
    background: '#f9f9f9',
    primary: '#1F8505',
    text: '#fff',
    secondary: '#D6F1D4',
    inputBorder: '#ebeff3',
    activeBorder: '#D6F1D4',
    iconColor: '#70B261',
    success: '#488E48',
    descriptionColor: '#797979',
    inputPlaceholder: '#868182',
    error: '#FF0000',
  },
  dark: {
    background: '#f9f9f9',
    primary: '#1F8505',
    text: '#fff',
    secondary: '#D6F1D4',
    inputBorder: '#ebeff3',
    activeBorder: '#D6F1D4',
    iconColor: '#70B261',
    success: '#488E48',
    descriptionColor: '#797979',
    inputPlaceholder: '#868182',
    error: '#FF0000',
  },
};

const useThemeColors = () => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  return colors;
};

export default useThemeColors;
