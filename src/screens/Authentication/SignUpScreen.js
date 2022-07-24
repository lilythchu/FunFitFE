import React, {useState} from 'react';
import {
  View,
  Text,
  // ScrollView,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {EMAIL_REGEX} from '../../../utils/methods';
import Picture from '../../../assets/images/signup.png';
import globalStyles from '../../../styles/global';
import client from '../../../api/client';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [dismiss, setDismiss] = useState(true);
  const [viewPassword, setViewPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('VN');
  const [country, setCountry] = useState();

  const onSelect = countries => {
    setCountry(countries.name);
    setCountryCode(countries.cca2);
  };

  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onRegisterPressed = credentials => {
    const userInfo = {
      email: credentials.email,
      name: credentials.name,
      password: credentials.password,
      sex: credentials.sex,
      country: country,
    };
    setLoading(true);
    client
      .post('/user/signup', userInfo)
      .then(response => {
        setLoading(false);
        console.log(response.data);
        const token = response.data.token;
        navigation.navigate('ExtraInfo', {token});
      })
      .catch(error => {
        setDismiss(false);
        setLoading(false);
        const res = error.response.data;
        if (res.message === 'User already existed') {
          setMessage('Email already existed');
        } else {
          setMessage('Oops! Something went wrong, try again');
        }
      });
  };

  return (
    <KeyboardAwareScrollView
    style={{ backgroundColor: "white" }}
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={globalStyles.scrollView}
    scrollEnabled={true}>
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
            rightIcon={
              <TouchableOpacity onPress={handleViewPassword}>
                <Icon
                  type={'font-awesome'}
                  name={viewPassword ? 'eye' : 'eye-slash'}
                  color="#424040"
                />
              </TouchableOpacity>
            }
            control={control}
            placeholder="Password"
            secureTextEntry={!viewPassword}
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
            secureTextEntry={!viewPassword}
            rules={{
              validate: value => value === pwd || 'Password do not match',
            }}
          />
          <CustomInput
            name="sex"
            icon="transgender"
            control={control}
            placeholder="Male/Female/Others"
            rules={{
              required: 'Gender is required',
              validate: value =>
                value === 'Male' ||
                value === 'Female' ||
                value === 'Others' ||
                'Gender does not match',
            }}
          />
          <CustomInput
            name="country"
            icon="globe"
            rightIcon={
              <CountryPicker
                withFilter
                countryCode={countryCode}
                withAlphaFilter={false}
                withFlag
                withEmoji={false}
                withCurrencyButton={false}
                onSelect={onSelect}
              />
            }
            control={control}
            placeholder="Select your country"
            value={country}
            disabled={true}
          />

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
              title="Continue"
              onPress={handleSubmit(onRegisterPressed)}
            />
          )}

          <View style={globalStyles.textLinkContainer}>
            <Text>
              Have an account?{' '}
              <Text style={globalStyles.link} onPress={onSignInPress}>
                Sign in
              </Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;
