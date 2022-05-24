import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, useWindowDimensions, Image} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import { globalStyles } from '../../../styles/global';
import ResetPic from '../../../assets/images/newPass.png';

const NewPasswordScreen = () => {
  const {height} = useWindowDimensions();
  const {control, handleSubmit} = useForm();

  const navigation = useNavigation();

  const onSubmitPressed = data => {
    console.warn(data);
    navigation.navigate('BottomNav');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={globalStyles.root}>
        <Image 
          source={ResetPic}
          style={[globalStyles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <Text style={globalStyles.title}>Reset your password</Text>

        <CustomInput
          placeholder="Code"
          name="code"
          control={control}
          rules={{required: 'Code is required'}}
        />

        <CustomInput
          placeholder="Enter your new password"
          name="name"
          control={control}
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />

        <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
});

export default NewPasswordScreen;
