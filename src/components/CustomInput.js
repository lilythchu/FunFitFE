import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import globalColors from '../../styles/colors';
import {TextInput} from 'react-native-paper';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  type,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View>
            <TextInput
              activeUnderlineColor={globalColors.babyBlue}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              style={styles[`container_${type}`]}
              {...props}
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
  container_FIRST: {
    backgroundColor: 'white',
    width: '100%',
    height: 50,
  },
});

export default CustomInput;
