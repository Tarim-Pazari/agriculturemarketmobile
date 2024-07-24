import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import {RootStackParamList} from '../types/navigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {useEffect} from 'react';
import useFcmToken from '../hooks/useFcmToken';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {AppActions} from '../store/features/appReducer';
import {useAddFirebaseTokenMutation} from '../services/firebaseTokenService';
import FirebaseNotification from '../firebase/FirebaseNotification';
import auth from '@react-native-firebase/auth';
import {AuthActions} from '../store/features/authReducer';
import LoginResponse from '../payload/response/LoginResponse';
import UserRepository from '../repository/UserRepository';
import AddCostsScreen from '../screens/AddCostsScreen';
import CostsScreen from '../screens/CostsScreen';
import EditCostScreen from '../screens/EditCostScreen';
const Stack = createStackNavigator<RootStackParamList>();
const RootNavigator = () => {
  const userRepository = UserRepository.getInstance();
  const {fcmToken} = useFcmToken();
  const location = useSelector((state: RootState) => state.app.location);
  const userSelection = location;
  const [addFcmToken] = useAddFirebaseTokenMutation();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async user => {
      let entity = {
        email: user?.email,
        uid: user?.uid,
        name: user?.displayName,
        photoUrl: user?.photoURL,
        fullName: user?.displayName,
      } as LoginResponse;
      if (user) {
        const getUserInfo = await userRepository.getUser(user.uid);
        dispatch(AuthActions.setUser(entity));
      } else {
        dispatch(AuthActions.setUser(null));
      }
    });
    return subscriber;
  }, []);
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
        <Stack.Screen name="AddCostsScreen" component={AddCostsScreen} />
        <Stack.Screen name="CostsScreen" component={CostsScreen} />
        <Stack.Screen name="EditCostScreen" component={EditCostScreen} />
      </Stack.Navigator>
    </>
  );
};

export default RootNavigator;
