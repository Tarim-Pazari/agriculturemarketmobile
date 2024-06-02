import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faShop} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';

import {BottomTabParamList} from '../types/navigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import MenuScreen from '../screens/MenuScreen';
import useThemeColors from '../constant/useColor';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import UserScreen from '../screens/UserScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();
export default function BottomTabNavigator(
  props: NativeStackScreenProps<BottomTabParamList>,
) {
  const colors = useThemeColors();
  const iconColor = colors.iconColor;
  const inActiveIconColor = '#D8E7D6';
  const {user} = useSelector((state: RootState) => state.auth);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          borderTopColor: '#fff',

          position: 'absolute',
        },
        tabBarActiveTintColor: iconColor,
        tabBarInactiveTintColor: inActiveIconColor,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <FontAwesomeIcon
              icon={faShop}
              size={20}
              color={focused ? iconColor : inActiveIconColor}
            />
          ),
          tabBarLabel: 'Fiyatlar',
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Menu"
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <FontAwesomeIcon
              icon={faBars}
              size={20}
              color={focused ? iconColor : inActiveIconColor}
            />
          ),
          tabBarLabel: 'Menü',
        }}
        component={MenuScreen}
      />
      {user === null ? (
        <Tab.Screen
          name={'LoginScreen'}
          listeners={{
            tabPress: e => {
              e.preventDefault();
              props.navigation.navigate('LoginScreen');
            },
          }}
          options={{
            tabBarIcon: ({color, size, focused}) => (
              <FontAwesomeIcon
                icon={faUser}
                size={20}
                color={focused ? iconColor : inActiveIconColor}
              />
            ),
            tabBarLabel: 'Profil',
          }}
          component={LoginScreen}
        />
      ) : (
        <Tab.Screen
          name={'UserScreen'}
          options={{
            tabBarIcon: ({color, size, focused}) => (
              <FontAwesomeIcon
                icon={faUser}
                size={20}
                color={focused ? iconColor : inActiveIconColor}
              />
            ),
            tabBarLabel: 'Profil',
          }}
          component={UserScreen}
        />
      )}
    </Tab.Navigator>
  );
}
