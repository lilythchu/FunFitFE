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
