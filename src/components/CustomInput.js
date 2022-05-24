import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Controller} from 'react-hook-form';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              {borderColor: error ? 'red' : defBorderCol},
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
};

const defBorderCol = '#a6a2a2';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderWidth: 1,
    borderRadius: 20,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    height: 50,
  },
});

export default CustomInput;
