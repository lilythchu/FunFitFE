import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Providers from './src/navigation/Providers';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Providers />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
