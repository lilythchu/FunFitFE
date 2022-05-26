import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {globalStyles} from '../../../styles/global';
import Picture from '../../../assets/images/signup.png';
import {SignUpURL} from '../../../api/client';
import {EMAIL_REGEX, onPrivacyPressed, onTermsOfUsePressed} from '../../../utils/methods';

const SignUpScreen = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };
  const onRegisterPressed = data => {
    fetch(SignUpURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.message === 'User created!') {
          alert(response.message);
          navigation.navigate('SignIn');
        } else {
          alert(response.message);
        }
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={globalStyles.root}>
        <Image 
          source={Picture}
          style={globalStyles.logo}
          resizeMode="contain"
        />
        <Text style={globalStyles.title}>Create an account</Text>

        <CustomInput
          icon="user"
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Username should be max 24 characters long',
            },
          }}
        />

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

        <CustomInput
          name="password"
          icon="key"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />
        
        <CustomInput
          name="password-repeat"
          icon="lock"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            validate: value => value === pwd || 'Password do not match',
          }}
        />

        <CustomButton
          title="Register"
          onPress={handleSubmit(onRegisterPressed)}
        />

        <Text style={globalStyles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={globalStyles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={globalStyles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        <SocialSignInButtons />

        <CustomButton
          title={
            <Text>
              Have an account?{' '}
              <Text style={globalStyles.link} onPress={onSignInPress}>
                Sign in
              </Text>
            </Text>
          }
          type="THIRD"
        />
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
