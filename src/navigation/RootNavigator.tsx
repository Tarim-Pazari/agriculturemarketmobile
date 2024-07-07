import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import {RootStackParamList} from '../types/navigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProductScreen from '../screens/ProductScreen';
import {useEffect} from 'react';
import useFcmToken from '../hooks/useFcmToken';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {AppActions} from '../store/features/appReducer';
import {useAddFirebaseTokenMutation} from '../services/firebaseTokenService';
import PriceTrackingScreen from '../screens/PriceTrackingScreen';
import SplashScreen from '../screens/SplashScreen';
import FirebaseNotification from '../firebase/FirebaseNotification';

const Stack = createStackNavigator<RootStackParamList>();
const RootNavigator = () => {
  const {fcmToken} = useFcmToken();
  const location = useSelector((state: RootState) => state.app.location);
  const userSelection = location;
  const [addFcmToken] = useAddFirebaseTokenMutation();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (fcmToken != '') {
      dispatch(AppActions.setFirebaseToken(fcmToken));
      if (userSelection?.district) {
        addFcmToken({
          fcmToken: fcmToken,
          districtId: userSelection.district.id,
        });
      } else {
        addFcmToken({fcmToken: fcmToken});
      }
    }
  }, [fcmToken]);

  return (
    <>
      <FirebaseNotification />
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
    </>
  );
};

export default RootNavigator;
