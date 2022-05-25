import React from 'react';
import {StyleSheet} from 'react-native';
import { Button, ThemeProvider } from '@rneui/themed';

const CustomButton = ({
  type='FIRST',
  ...props
}) => {
  return (
    <ThemeProvider>
      <Button
        buttonStyle={[
          styles.btn,
          styles[`btn_${type}`]
        ]}
        containerStyle={styles.container}
        titleStyle={[
          styles.title,
          styles[`title_${type}`]
        ]}
        iconContainerStyle={{marginRight: 10}}
        {...props}
      >
      </Button>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
  },
  btn: {
    borderWidth: 0,
    borderRadius: 30,
    borderColor: 'transparent',
  },
  btn_FIRST: {
    backgroundColor: '#68bbe3',
  },
  btn_SECOND: {
    borderColor: '#3B71F3',
    borderWidth: 2,
  },
  btn_THIRD: {
    backgroundColor: 'white'
  },
  btn_FOURTH: {
    backgroundColor: '#e6eaf4',
  },
  btn_FIFTH: {
    backgroundColor: '#f5e7ea',
  },
  title: {
  },
  title_FIRST: {
    fontWeight: 'bold',
    color: 'white',
  },
  title_SECOND: {
    color: '#3B71F3',
  },
  title_THIRD: {
    color: 'gray',
  },
  title_FOURTH: {
    fontWeight: '600',
    color: '#4867aa',
  },
  title_FIFTH: {
    fontWeight: '600',
    color: '#de4d41',
  },
});

export default CustomButton;
