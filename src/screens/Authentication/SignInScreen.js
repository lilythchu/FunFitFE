import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Logo from '../../../assets/images/login.png';
import CustomInput from '../../components/CustomInput.js';
import CustomButton from '../../components/CustomButton.js';
import SocialSignInButtons from '../../components/SocialSignInButtons.js';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import { globalStyles } from '../../../styles/global';
import { Checkbox } from 'react-native-paper';

const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const [check, setCheck] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSignInPressed = data => {
    console.log(data);
    navigation.navigate('BottomNav');
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={globalStyles.root}>
        <Image
          source={Logo}
          style={[globalStyles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />

        <CustomInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{required: 'Username is required'}}
        />

        <CustomInput
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

        <View style={{flexDirection: 'row'}}>
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

        <CustomButton text="Sign in" onPress={handleSubmit(onSignInPressed)} />

        <CustomButton 
          text={
            <Text>
              Don't have an account ? {' '}
                <Text style={globalStyles.link} onPress={onSignUpPress}>Sign up</Text>
            </Text>
          }
          type="TERTIARY"
        />

        <SocialSignInButtons />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
});

export default SignInScreen;
