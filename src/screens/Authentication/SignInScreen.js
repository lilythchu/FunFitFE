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
import {Icon} from 'react-native-elements';
import Logo from '../../../assets/images/login.png';
import CustomInput from '../../components/CustomInput.js';
import CustomButton from '../../components/CustomButton.js';

import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {useLogin} from '../../../context/AuthProvider';
import {EMAIL_REGEX} from '../../../utils/methods';
import globalStyles from '../../../styles/global';
import client from '../../../api/client';

const SignInScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const {setIsLoggedIn, setProfile, setToken} = useLogin();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [dismiss, setDismiss] = useState(true);
  const [viewPassword, setViewPassword] = useState(false);
  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  const onSignInPressed = credentials => {
    setLoading(true);
    client
      .post('/user/login', credentials)
      .then(response => {
        const token = response.data.token;
        setToken(token);
        client
          .get('/user/me', {headers: {Authorization: `Bearer ${token}`}})
          .then(res => {
            if (res.data.age === undefined) {
              navigation.navigate('ExtraInfo');
            } else {
              setLoading(false);
              setIsLoggedIn(true);
              setProfile(res.data);
            }
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        setLoading(false);
        setDismiss(false);
        const mes = error.response.data.message;
        if (mes === 'User does not exist' || mes === 'Incorrect password') {
          setMessage(mes);
        } else {
          setMessage('Oops! Something went wrong, try again');
        }
      });
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={globalStyles.scrollView}>
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
              required: 'Email is required',
              pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
            }}
          />

          <CustomInput
            label="Password"
            icon="lock"
            name="password"
            rightIcon={
              <TouchableOpacity onPress={handleViewPassword}>
                <Icon
                  type={'font-awesome'}
                  name={viewPassword ? 'eye' : 'eye-slash'}
                  color="#424040"
                />
              </TouchableOpacity>
            }
            placeholder="Password"
            secureTextEntry={!viewPassword}
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
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={onForgotPasswordPressed}>
                <Text style={globalStyles.link}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'red', fontSize: 16}}>
              {message && !dismiss ? message : ''}
            </Text>
          </View>

          {loading ? (
            <ActivityIndicator
              size="large"
              style={globalStyles.activityIdicator}
            />
          ) : (
            <CustomButton
              title="Sign in"
              onPress={handleSubmit(onSignInPressed)}
            />
          )}

          <View style={globalStyles.textLinkContainer}>
            <Text>
              Don't have an account?{' '}
              <Text style={globalStyles.link} onPress={onSignUpPressed}>
                Sign up
              </Text>
            </Text>
          </View>

          {/* <SocialSignInButtons /> */}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default SignInScreen;
