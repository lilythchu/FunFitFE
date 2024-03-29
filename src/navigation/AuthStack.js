import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/Authentication/SignInScreen.js';
import SignUpScreen from '../screens/Authentication/SignUpScreen.js';
import ForgotPasswordScreen from '../screens/Authentication/ForgotPasswordScreen.js';
import NewPasswordScreen from '../screens/Authentication/NewPasswordScreen.js';
import OnboardingScreen from '../screens/OnboardingScreen.js';
import ExtraInfoScreen from '../screens/Authentication/ExtraInfoScreen.js';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ExtraInfo" component={ExtraInfoScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
