import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ChatStoriesScreen from '../screens/Core/Chats/ChatStoriesScreen';

const Stack = createNativeStackNavigator();
const ChatStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ChatStory" component={ChatStoriesScreen} />
    </Stack.Navigator>
  );
};

export default ChatStack;
