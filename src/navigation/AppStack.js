import * as React from 'react';
import {Icon} from '@rneui/themed';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import globalColors from '../../styles/colors.js';

import HomeStack from './HomeStack.js';
import NotiScreen from '../screens/Core/NotiScreen.js';
import ChatStack from './ChatStack.js';
import ProfileStack from './ProfileStack.js';
import ChatScreen from '../screens/Core/Chats/ChatScreen.js';
import OthersProfileScreen from '../screens/Core/Profile/OthersProfileScreen.js';
import StoryScreen from '../screens/Core/Chats/StoryScreen.js';
import MyStoryScreen from '../screens/Core/Chats/MyStoryScreen.js';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      activeColor={globalColors.blueGrotto}
      barStyle={{backgroundColor: 'white'}}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" type="feather" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatStack}
        options={({route}) => ({
          tabBarIcon: ({color, size}) => (
            <Icon
              name="message-square"
              type="feather"
              size={size}
              color={color}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Notification"
        component={NotiScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="bell" type="feather" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="user" type="feather" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={BottomTab} />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({route}) => ({
          title: route.params.item.friend[0].name,
          headerShown: true,
        })}
      />
      <Stack.Screen name="OtherProfile" component={OthersProfileScreen} />
      <Stack.Screen name='Story' component={StoryScreen} />
      <Stack.Screen name='MyStory' component={MyStoryScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
