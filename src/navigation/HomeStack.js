import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/Core/Home/HomeScreen.js';
import DetailsScreen from '../screens/Core/Home/DetailsScreen.js';
import RecScreen from '../screens/Core/Home/RecScreen.js';
import PlayVideo from '../screens/Core/Home/PlayVideo.js';
import AddRoutineScreen from '../screens/Core/Home/AddRoutineScreen.js';
import EditRoutineScreen from '../screens/Core/Home/EditRoutineScreen.js';
import PlayAudio from '../screens/Core/Home/PlayAudio.js';
import TimePickerScreen from '../screens/Core/Home/TimePickerScreen.js';

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Routine" component={HomeScreen} />
      <Stack.Screen
        name="Audio"
        component={PlayAudio}
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
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="AddRoutine" component={AddRoutineScreen} />
      <Stack.Screen name="EditRoutine" component={EditRoutineScreen} />
      <Stack.Screen name="TimePicker" component={TimePickerScreen} />
      <Stack.Screen
        name="Video"
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
        name="Recommended"
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
  );
};

export default HomeStack;
