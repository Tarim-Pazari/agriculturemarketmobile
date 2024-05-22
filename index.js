import {AppRegistry, LogBox} from 'react-native';
import {name as appName} from './app.json';
import {LocaleConfig} from 'react-native-calendars';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import {ModalPortal} from 'react-native-modals';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store';
import 'react-native-gesture-handler';
import React from 'react';
LogBox.ignoreAllLogs();
LocaleConfig.locales['tr'] = {
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
  today: 'Bugün',
};
LocaleConfig.defaultLocale = 'tr';

const AgricultureMarket = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </PersistGate>
        <ModalPortal />
      </Provider>
    </React.StrictMode>
  );
};

AppRegistry.registerComponent(appName, () => AgricultureMarket);
