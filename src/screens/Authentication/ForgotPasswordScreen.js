import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {globalStyles} from '../../../styles/global';
import Pic from '../../../assets/images/forgot.png';

const ForgotPasswordScreen = () => {
  const {height} = useWindowDimensions();
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={globalStyles.root}>
        <Image
          source={Pic}
          style={[globalStyles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />

        <Text style={globalStyles.title}>Reset your password</Text>

        <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username is required',
          }}
        />

        <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
