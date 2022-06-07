import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {globalStyles} from '../../../styles/global';
import Picture from '../../../assets/images/signup.png';
import {EMAIL_REGEX, onPrivacyPressed, onTermsOfUsePressed} from '../../../utils/methods';
import {signupURL, userURL} from '../../../api/client';
import {useLogin} from '../../../context/AuthProvider';
import { Icon } from '@rneui/themed';
import CountryPicker from 'react-native-country-picker-modal';
import axios from 'axios';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const {setIsLoggedIn, setProfile} = useLogin();
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [dismiss, setDismiss] = useState(true);
  const [viewPassword, setViewPassword] = useState(false);
  const [text, setText] = useState();
  const [countryCode, setCountryCode] = useState('VN');
  const [country, setCountry] = useState();

  const onSelect = (country) => {
    setCountry(country.name);
    setCountryCode(country.cca2)
  };

  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  }

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onRegisterPressed = credentials => {
    const userInfo = {
      "email": credentials.email,
      "name": credentials.name,
      "password": credentials.password,
      "sex": credentials.sex,
      "country": country
    }
    setLoading(true);
    axios
      .post(signupURL, userInfo)
      .then((response) => {
        setLoading(false);
        setIsLoggedIn(true);
        const token = response.data.token;
        axios
          .get(userURL, {headers: {"Authorization": `Bearer ${token}`}})
          .then(response => {
            setProfile(response.data);
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        setDismiss(false);
        setLoading(false);
        const mes = error.response.data;
        if (mes === 'User already existed') {
          setMessage('Email already existed');
        } else {
          setMessage('Oops! Something went wrong, try again');
        }
      })
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyles.scrollView}>
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
                <Icon type={'font-awesome'} name={viewPassword ? "eye" : "eye-slash"} color="#424040" />
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
              validate: value => value === "Male" || value === "Female" || value === "Others" || 'Gender does not match', 
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
              {(message && !dismiss) ? message : ''}
            </Text>
          </View>

          { loading
            ? <ActivityIndicator size="large" style={globalStyles.activityIdicator} />
            : <CustomButton title="Sign up" onPress={handleSubmit(onRegisterPressed)} />
          }
          
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

          {/* <SocialSignInButtons /> */}

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
    </ScrollView>
  );
};

export default SignUpScreen;
