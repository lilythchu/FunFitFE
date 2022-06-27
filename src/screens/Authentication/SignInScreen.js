import React, {useState} from 'react';
import * as Notifications from 'expo-notifications';
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
import globalStyles from '../../../styles/global';
import {Checkbox} from 'react-native-paper';
import {useLogin} from '../../../context/AuthProvider';
import {loginURL, userURL} from '../../../api/client';
import {EMAIL_REGEX} from '../../../utils/methods';
import {Icon} from '@rneui/themed';
import axios from 'axios';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const SignInScreen = () => {
  const navigation = useNavigation();
  const {control, handleSubmit, formState: {errors}} = useForm();
  const {setIsLoggedIn, setProfile, setToken, profile} = useLogin();

  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [dismiss, setDismiss] = useState(true);
  const [viewPassword, setViewPassword] = useState(false);
  
  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  }

  const onSignInPressed = (credentials) => {
    setLoading(true);
    axios
      .post(loginURL, credentials)
      .then((response) => {
        const token = response.data.token;
        setToken(token);
        axios
          .get(userURL, {headers: {"Authorization": `Bearer ${token}`}})
          .then(response => {
            if (response.data.age === undefined) {
              navigation.navigate("ExtraInfo");
            } else {
              setLoading(false);
              setIsLoggedIn(true);
              setProfile(response.data);
              welcome();
            }
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        setLoading(false);
        setDismiss(false);
        const mes = error.response.data;
        if (mes === 'User does not exist' || mes == 'Incorrect password') {
          setMessage(mes);
        } else {
          setMessage('Oops! Something went wrong, try again');
        }
      })
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyles.scrollView}>
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
            rightIcon = {
              <TouchableOpacity onPress={handleViewPassword}>
                <Icon type={'font-awesome'} name={viewPassword ? "eye" : "eye-slash"} color="#424040" />
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
            {/* <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Checkbox 
                status={check ? 'checked' : 'unchecked'}
                onPress={() => setCheck(!check)}
              />
              <Text>Remember me</Text>
            </View> */}
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={onForgotPasswordPressed}>
                <Text style={globalStyles.link}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'red', fontSize: 16}}>{(message && !dismiss) ? message : ''}</Text>
          </View>

          { loading
            ? <ActivityIndicator size="large" style={globalStyles.activityIdicator} />
            : <CustomButton title="Sign in" onPress={handleSubmit(onSignInPressed)} />
          }

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

async function welcome() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Welcome to Funfit! 📬",
      body: 'Have a nice day',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}