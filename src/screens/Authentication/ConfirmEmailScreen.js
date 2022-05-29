import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {globalStyles} from '../../../styles/global';

const ConfirmEmailScreen = () => {
  const {control, handleSubmit} = useForm();

  const navigation = useNavigation();

  const onConfirmPressed = data => {
    console.warn(data);
    navigation.navigate('BottomNav');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onResendPress = () => {
    console.warn('onResendPress');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyles.scrollView}>
      <View style={globalStyles.root}>
        <Text style={globalStyles.title}>Confirm your email</Text>

        <CustomInput
          name="code"
          control={control}
          placeholder="Enter your confirmation code"
          rules={{
            required: 'Confirmation code is required',
          }}
        />

        <CustomButton
          title="Confirm"
          onPress={handleSubmit(onConfirmPressed)}
        />

        <CustomButton
          title="Resend code"
          onPress={onResendPress}
          type="SECOND"
        />

        <CustomButton
          title="Back to Sign in"
          onPress={onSignInPress}
          type="THIRD"
        />
      </View>
    </ScrollView>
  );
};

export default ConfirmEmailScreen;

