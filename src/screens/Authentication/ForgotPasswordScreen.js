import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {globalStyles} from '../../../styles/global';
import { EMAIL_REGEX } from '../../../utils/methods';
import Pic from '../../../assets/images/forgot.png';

const ForgotPasswordScreen = () => {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();

  const onSendPressed = data => {
    console.warn(data);
    navigation.navigate('NewPassword');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };
  
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyles.scrollView}>
      <View style={globalStyles.root}>
        <Image source={Pic} style={globalStyles.logo} resizeMode="contain" />
        
        <Text style={globalStyles.title}>Reset your password</Text>

        <CustomInput
          name="email"
          icon="envelope"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
        />

        <CustomButton title="Send" onPress={handleSubmit(onSendPressed)} />

        <View style={globalStyles.textLinkContainer}>
          <Text>
            Back to{' '} 
            <Text style={globalStyles.link} onPress={onSignInPress}>
              Sign in
            </Text>
          </Text>
        </View>
        
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
