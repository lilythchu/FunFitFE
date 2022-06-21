import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/MainScreen/Profile/ProfileScreen';

const Stack = createNativeStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='MyProfile' component={ProfileScreen} />
      {/* <Stack.Screen name='OtherProfile' component={OthersProfileScreen} /> */}
    </Stack.Navigator>
  )
}

export default ProfileStack;