import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faShop} from '@fortawesome/free-solid-svg-icons';
import {faBell} from '@fortawesome/free-regular-svg-icons';

const Tab = createBottomTabNavigator();
export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          borderTopColor: '#fff',
        },
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faShop} size={20} color={'#fab421'} />
          ),
          tabBarLabel: 'Gıda Fiyatları',
          tabBarLabelStyle: {
            fontSize: 10,
            color: '#868182',
            fontWeight: 'bold',
          },
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Home2"
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faShop} size={20} color={'#fab421'} />
          ),
          tabBarLabel: 'Gıda Fiyatları',
          tabBarLabelStyle: {
            fontSize: 10,
            color: '#868182',
            fontWeight: 'bold',
          },
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Hom3"
        options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesomeIcon icon={faBell} size={20} color={'#fab421'} />
          ),
          tabBarLabel: 'Gıda Fiyatları',
          tabBarLabelStyle: {
            fontSize: 10,
            color: '#868182',
            fontWeight: 'bold',
          },
        }}
        component={HomeScreen}
      />
    </Tab.Navigator>
  );
}
