import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
  CheckBox,
  TouchableOpacity
} from 'react-native';
import Logo from '../../../assets/images/cs.jpg';
import CustomInput from '../../components/CustomInput.js';
import CustomButton from '../../components/CustomButton.js';
import SocialSignInButtons from '../../components/SocialSignInButtons.js';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';

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
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
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
          <View style={{flex: 0.5}}>
            <CheckBox 
              value={check}
              onValueChange={() => setCheck(!check)}
            />
            <Text>Remember me</Text>
          </View>
          <View style={{flex: 0.5, alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={onForgotPasswordPressed}>
              <Text>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)} />
        <CustomButton 
          text={
            <Text>
              Don't have an account ? <Text style={{color: 'blue'}}>Sign Up</Text>
            </Text>
          }
          onPress={onSignUpPress} 
          type="TERTIARY"
        />

        {/*<CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />*/}
        <SocialSignInButtons />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    alignSelf: 'center'
  },
  checkboxContainer: {
    flex: 1,
    marginBottomL: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
});

export default SignInScreen;
