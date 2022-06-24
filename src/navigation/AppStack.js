import * as React from 'react';
import { StyleSheet } from 'react-native';
import globalColors from '../../styles/colors.js';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from '@rneui/themed';

import HomeStack from './HomeStack.js';
import CalendarScreen from '../screens/Core/CalendarScreen.js';
import NotiScreen from '../screens/Core/NotiScreen.js';
import ChatStack from './ChatStack.js';
import ProfileStack from './ProfileStack.js';

const Tab = createMaterialBottomTabNavigator();

const AppStack = () => {
  return (
    <Tab.Navigator
      activeColor={globalColors.blueGrotto}
      barStyle={{backgroundColor: 'white'}}
    >
      <Tab.Screen 
        name='Home'
        component={HomeStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name='home' type='feather' size={size} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name='Chats'
        component={ChatStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name='message-square' type='feather' size={size} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name='Calendar'
        component={CalendarScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name='calendar' type='feather' size={size} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name='Notification'
        component={NotiScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name='bell' type='feather' size={size} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name='Profile'
        component={ProfileStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name='user' type='feather' size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;

