import React from 'react';
import { Button, ThemeProvider } from '@rneui/themed';
import {View} from 'react-native';

const Clone = () => {
  return (
    <ThemeProvider>
      <Button title="Hey!" />
    </ThemeProvider>
  );
};

export default Clone;