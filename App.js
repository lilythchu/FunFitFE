import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Providers from './src/navigation/Providers';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Providers />
    </SafeAreaView>
  )
};

export default App;
