import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {useLogin} from '../../context/AuthProvider';

const Routes = () => {
  const {isLoggedIn} = useLogin();
  return (
    <NavigationContainer>
      {!isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
