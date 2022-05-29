import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import globalColors from '../../styles/colors';
import {Input, Icon} from '@rneui/themed';

const CustomInput = ({
  icon,
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  type = 'FIRST',
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
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              labelStyle={styles.label}
              containerStyle={[styles.container, styles[`container_${type}`]]}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
              leftIcon = {
                <Icon type={'font-awesome'} name={icon} color="#424040" />
              }
              leftIconContainerStyle={icon ? styles.iconLeft : {}}
              errorMessage={error ? error.message : ''}
              errorStyle={{fontSize: 15}}
              {...props}
            />
          </View>   
          {/* {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>
              {error.message || 'Error'}
            </Text>
          )} */}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  container_FIRST: {
    backgroundColor: 'white',
  },
  iconLeft: {
    marginRight: 8,
    width: 24,
    height: 24,
  },
  label: {},
  input: {},
  inputContainer: {},
});

export default CustomInput;
