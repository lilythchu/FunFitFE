import React, {useState} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Logo from '../../../assets/images/login.png';
import CustomInput from '../../components/CustomInput.js';
import CustomButton from '../../components/CustomButton.js';
import SocialSignInButtons from '../../components/SocialSignInButtons.js';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {globalStyles} from '../../../styles/global';
import {Checkbox} from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { useLogin } from '../../../context/AuthProvider';
import { SignInURL } from '../../../api/client';
import Icon from 'react-native-vector-icons/FontAwesome';
import base64 from 'base-64';

const SignInScreen = () => {
  const {setIsLoggedIn} = useLogin();
  const navigation = useNavigation();
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  
  const onSignInPressed = data => {
    console.log(data);
    setLoading(true);
    setIsLoggedIn(true);
    // const {setIsLoggedIn} = useLogin();
    // setLoading(true);
    // fetch(SignInURL, {
    //   method: "GET",
    //   headers: {
    //     "cache-control": "no-cache",
    //     Connection: "keep-alive",
    //     "Accept-Encoding": "gzip, deflate",
    //     "Cache-Control": "no-cache",
    //     Accept: "*/*",
    //     Authorization: `Basic ${base64.encode(
    //       `${data.username}:${data.password}`
    //     )}`,
    //   },
    // })
    // .then((response) => {
    //   setLoading(false);
    //   return response.json();
    // })
    // .then((response) => {
    //   if (response.token) {
    //     navigation.navigate("AppStack", {
    //       username: data.username,
    //       token: response.token,
    //     });
    //   } else alert("Username or Password is Incorrect!");
    // });
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={globalStyles.root}>
        <Image
          source={Logo}
          style={globalStyles.logo}
          resizeMode="contain"
        />

        <CustomInput
          name="username"
          label="Username"
          placeholder="Username"
          control={control}
          rules={{required: 'Username is required'}}
          type="FIRST"
          icon='user'
        />

        <CustomInput
          type="FIRST"
          label="Password"
          icon='lock'
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
    </ScrollView>
  );
};

export default SignInScreen;