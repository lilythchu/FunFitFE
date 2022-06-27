import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import Providers from './src/navigation/Providers';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar />
      <Providers />
    </SafeAreaView>
  )
};

export default App;
