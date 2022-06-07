import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RoutineScreen from '../screens/MainScreen/Routine/RoutineScreen.js';
import DetailsScreen from '../screens/MainScreen/Routine/DetailsScreen.js';
import RecScreen from '../screens/MainScreen/Routine/RecScreen.js';
import PlayVideo from '../screens/MainScreen/Routine/PlayVideo.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const RoutineStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='Routine' component={RoutineScreen} />
      <Stack.Screen name='Details' component={DetailsScreen} />
      <Stack.Screen
        name='Video'
        component={PlayVideo}
        options={{
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'gray',
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 25,
          },
          headerShown: true,
        }}
      />
      <Stack.Screen 
        name='Recommended'
        component={RecScreen}
        options={{
          title: 'Routines',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: 'gray',
          headerTitleStyle: {
            fontWeight: '400',
            fontSize: 25,
          },
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  )
}

export default RoutineStack;