import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatStoriesScreen from '../screens/MainScreen/Chats/ChatStoriesScreen';
import StoryScreen from '../screens/MainScreen/Chats/StoryScreen';

const Stack = createNativeStackNavigator();
const ChatStack= () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='ChatStory' component={ChatStoriesScreen} />
      {/* <Stack.Screen name='Chat' component={ChatScreen} /> */}
      <Stack.Screen name='Story' component={StoryScreen} />
    </Stack.Navigator>
  )
}

export default ChatStack;