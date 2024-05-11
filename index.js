/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './src/screens/HomeScreen';
import {name as appName} from './app.json';
import {LocaleConfig} from 'react-native-calendars';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import {ModalPortal} from 'react-native-modals';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
LogBox.ignoreAllLogs();
LocaleConfig.locales['de'] = {
  monthNames: [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ],
  monthNamesShort: [
    'Ocak',
    'Şub',
    'Mar',
    'Nis',
    'May',
    'Haz',
    'Tem',
    'Ağu',
    'Eyl',
    'Eki',
    'Kas',
    'Ara',
  ],
  dayNames: [
    'Pazar',
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
  ],
  dayNamesShort: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
  today: 'Heute',
};
LocaleConfig.defaultLocale = 'de';

const AgricultureMarket = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
      <ModalPortal />
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => AgricultureMarket);
