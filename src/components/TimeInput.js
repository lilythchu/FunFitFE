import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomInput from './CustomInput';

const TimeInput = ({control, num, require = true}) => {
  return (
    <View style={styles.timeContainer}>
      <CustomInput
        type="TIME"
        name={`h${num}`}
        keyboardType="numeric"
        control={control}
        rightIcon={<Text>:</Text>}
        rules={{
          required: 'hour',
        }}
      />
      <CustomInput
        type="TIME"
        name={`min${num}`}
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
        name={`sec${num}`}
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
