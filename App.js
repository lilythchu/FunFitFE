import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import LoginNavigation from './src/navigation/LoginNavigation';
import Clone from './Clone';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <LoginNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
