import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {globalStyles} from '../../../styles/global';
import Picture from '../../../assets/images/signup.png';
import {EMAIL_REGEX, onPrivacyPressed, onTermsOfUsePressed} from '../../../utils/methods';
import {signupURL} from '../../../api/client';
import axios from 'axios';

const SignUpScreen = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [dismiss, setDismiss] = useState(true);

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };
  const onRegisterPressed = credentials => {
    setLoading(true);
    axios
      .post(signupURL, credentials)
      .then((response) => {
        setLoading(false);
        navigation.navigate('SignIn');
      })
      .catch(error => {
        console.log(error);
        setDismiss(false);
        setLoading(false);
        setMessage("Oops! Something went wrong, try again");
      })
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback onPress={() => setDismiss(true)}>
      <View style={globalStyles.root}>
        <Image 
          source={Picture}
          style={globalStyles.logo}
          resizeMode="contain"
        />
        <Text style={globalStyles.title}>Create an account</Text>

        <CustomInput
          icon="user"
          name="name"
          control={control}
          placeholder="Name"
          rules={{
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Name should be max 24 characters long',
            },
          }}
        />

        <CustomInput 
          name="email"
          icon="envelope"
          placeholder="Email"
          control={control}
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
        />

        <CustomInput
          name="password"
          icon="lock"
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
          name="confirm-password"
          icon="key"
          control={control}
          placeholder="Confirm Password"
          secureTextEntry
          rules={{
            validate: value => value === pwd || 'Password do not match',
          }}
        />

        <CustomInput 
          name="sex"
          icon="transgender"
          control={control}
          placeholder="Gender"
          rules={{
            required: 'Gender is required',
          }}
        />

        <CustomInput 
          name="country"
          icon="globe"
          control={control}
          placeholder="Country"
          rules={{
            required: 'Contry is required',
          }}
        />

        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'red', fontSize: 16}}>
            {(message && !dismiss) ? message : ''}
          </Text>
        </View>

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
        <ActivityIndicator 
          animating={loading}
          style={{padding: 25, color: 'black'}}
          size="large"
        />
      </View>
    </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default SignUpScreen;
