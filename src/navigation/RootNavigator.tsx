import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import {RootStackParamList} from '../types/navigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProductScreen from '../screens/ProductScreen';
import {useEffect} from 'react';
import useFcmToken from '../hooks/useFcmToken';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store';
import {AppActions} from '../store/features/appReducer';
import {useAddFirebaseTokenMutation} from '../services/firebaseTokenService';
import PriceTrackingScreen from '../screens/PriceTrackingScreen';

const Stack = createStackNavigator<RootStackParamList>();
const RootNavigator = () => {
  const {fcmToken} = useFcmToken();
  const [addFcmToken] = useAddFirebaseTokenMutation();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (fcmToken != '') {
      dispatch(AppActions.setFirebaseToken(fcmToken));
      addFcmToken({fcmToken: fcmToken});
    }
  }, [fcmToken]);

  return (
    <Stack.Navigator
      initialRouteName="BottomTabMenu"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
      }}>
      <Stack.Screen
        name="BottomTabMenu"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen
        name="PriceTrackingScreen"
        component={PriceTrackingScreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
