import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Button } from 'react-native-paper';

const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor, iconType}) => {
  return (
    <Button 
      uppercase={false}
      color='gray'
      icon={iconType}
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}
      labelStyle={[
        styles.text,
        styles[`text_${type}`],
        fgColor ? {color: fgColor} : {},
      ]} 
    >
      {text}
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
    padding: 15,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: 50,
  },
  container_PRIMARY: {
    backgroundColor: '#68bbe3',
  },
  container_SECONDARY: {
    borderColor: '#3B71F3',
    borderWidth: 2,
  },
  container_TERTIARY: {
    //backgroundColor: '#05eefa'
  },
  container_FOURTH: {
    backgroundColor: '#e6eaf4'
  },
  container_FIFTH: {
    backgroundColor: '#f5e7ea',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  text_SECONDARY: {
    color: '#3B71F3',
  },
  text_TERTIARY: {
    color: 'gray',
  },
  text_FOURTH: {
    color: '#4867aa',
  },
  text_FIFTH: {
    color: '#de4d41',
  }
});

export default CustomButton;
