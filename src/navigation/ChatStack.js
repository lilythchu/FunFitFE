import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatStoriesScreen from '../screens/Core/Chats/ChatStoriesScreen';
import StoryScreen from '../screens/Core/Chats/StoryScreen';
import ChatScreen from '../screens/Core/Chats/ChatScreen';
import OthersProfileScreen from '../screens/Core/Profile/OthersProfileScreen';

const Stack = createNativeStackNavigator();
const ChatStack= () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='ChatStory' component={ChatStoriesScreen} />
      <Stack.Screen name='Chat' component={ChatScreen} />
      <Stack.Screen name='Story' component={StoryScreen} />
      <Stack.Screen name='OtherProfile' component={OthersProfileScreen} />
    </Stack.Navigator>
  )
}

export default ChatStack;