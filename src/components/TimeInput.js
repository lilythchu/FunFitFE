import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomInput from './CustomInput';

const TimeInput = ({control, name}) => {
  return (
    <View style={styles.timeContainer}>
      <CustomInput
        type="TIME"
        name={`h${name}`}
        keyboardType="numeric"
        control={control}
        rightIcon={<Text>:</Text>}
        rules={{
          required: 'hour',
          maxLength: {
            value: 2, 
            message: '2 digits only'
          },
          max: {
            value: 10,
            message: 'invalid',
          },
          min: {
            value: 0,
            message: 'invalid',
          },
        }}
      />
      <CustomInput
        type="TIME"
        name={`min${name}`}
        keyboardType="numeric"
        control={control}
        rightIcon={<Text>:</Text>}
        rules={{
          required: 'minute',
          max: {
            value: 59,
            message: 'invalid',
          },
          min: {
            value: 0,
            message: 'invalid',
          },
          maxLength: {
            value: 2, 
            message: '2 digits only'
          }        
        }}
      />
      <CustomInput
        type="TIME"
        name={`sec${name}`}
        keyboardType="numeric"
        control={control}
        rules={{
          required: 'sec',
          max: {
            value: 59,
            message: 'invalid',
          },
          min: {
            value: 0,
            message: 'invalid',
          },
          maxLength: {
            value: 2, 
            message: '2 digits only'
          }
        }}
      />
    </View>
  );
};

export default TimeInput;

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: 'row',
  },
});
