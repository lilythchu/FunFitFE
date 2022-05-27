import React, {useState} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Logo from '../../../assets/images/login.png';
import CustomInput from '../../components/CustomInput.js';
import CustomButton from '../../components/CustomButton.js';
import SocialSignInButtons from '../../components/SocialSignInButtons.js';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {globalStyles} from '../../../styles/global';
import {Checkbox} from 'react-native-paper';
import {useLogin} from '../../../context/AuthProvider';
import {loginURL} from '../../../api/client';
import {EMAIL_REGEX} from '../../../utils/methods';
import axios from 'axios';

const SignInScreen = () => {
  const {setIsLoggedIn, setProfile} = useLogin();
  const navigation = useNavigation();
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const {control, handleSubmit, formState: {errors}} = useForm();
  const [message, setMessage] = useState('');
  const [dismiss, setDismiss] = useState(true);
  
  const onSignInPressed = (credentials) => {
    setLoading(true);
    axios
      .post(loginURL, credentials)
      .then((response) => {
        setLoading(false);
        setIsLoggedIn(true);
      })
      .catch(error => {
        setLoading(false);
        setDismiss(false);
        setMessage(error.response.data);
      })
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <TouchableWithoutFeedback onPress={() => setDismiss(true)}>
      <View style={globalStyles.root}>
        <Image source={Logo} style={globalStyles.logo} resizeMode="contain" />

        <CustomInput 
          name="email"
          icon="envelope"
          label="Email"
          placeholder="Email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {value: EMAIL_REGEX, message: "Email is invalid"},
          }}
        />

        <CustomInput
          label="Password"
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
          }}
        />

        <View style={{flexDirection: 'row', paddingVertical: 10}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Checkbox 
              status={check ? 'checked' : 'unchecked'}
              onPress={() => setCheck(!check)}
            />
            <Text>Remember me</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={onForgotPasswordPressed}>
              <Text style={globalStyles.link}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'red', fontSize: 16}}>{(message && !dismiss) ? message : ''}</Text>
        </View>

        <CustomButton title="Sign in" onPress={handleSubmit(onSignInPressed)} />
        
        <CustomButton
          title={
            <Text>
              Don't have an account?{' '}
              <Text style={globalStyles.link} onPress={onSignUpPressed}>
                Sign up
              </Text>
            </Text>
          }
          type="THIRD"
        />
        <SocialSignInButtons />
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

export default SignInScreen;