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
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import './src/lang/i18n';
LogBox.ignoreAllLogs();
dayjs.locale('tr');
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
GoogleSignin.configure({
  webClientId:
    '1056832416693-dmdfv28go5aa2gffi8oenkrmuncojq1k.apps.googleusercontent.com',
});
const TarimPazari = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PersistGate>
      <ModalPortal />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => TarimPazari);
