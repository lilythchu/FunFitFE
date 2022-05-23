import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/Authentication/SignInScreen';
import SignUpScreen from '../screens/Authentication/SignUpScreen';
import ForgotPasswordScreen from '../screens/Authentication/ForgotPasswordScreen';
import ConfirmEmailScreen from '../screens/Authentication/ConfirmEmailScreen';
import NewPasswordScreen from '../screens/Authentication/NewPasswordScreen';
import BottomNav from './BottomNav';


const Stack = createNativeStackNavigator();

const LoginNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen name="BottomNav" component={BottomNav} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default LoginNavigation;