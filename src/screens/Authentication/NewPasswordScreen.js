import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Image
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {globalStyles} from '../../../styles/global';
import ResetPic from '../../../assets/images/newPass.png';

const NewPasswordScreen = () => {
  const {height} = useWindowDimensions();
  const {control, handleSubmit} = useForm();

  const navigation = useNavigation();

  const onSubmitPressed = data => {
    console.log(data);
    navigation.navigate('SignIn');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={globalStyles.root}>
        <Image
          source={ResetPic}
          style={globalStyles.logo}
          resizeMode="contain"
        />
        <Text style={globalStyles.title}>Reset your password</Text>

        <CustomInput
          placeholder="Code"
          name="code"
          icon='lock'
          control={control}
          rules={{required: 'Code is required'}}
        />

        <CustomInput
          placeholder="Enter your new password"
          name="name"
          icon='lock'
          control={control}
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />

        <CustomButton title="Submit" onPress={handleSubmit(onSubmitPressed)} />

        <CustomButton
          title="Back to Sign in"
          onPress={onSignInPress}
          type="THIRD"
        />
      </View>
    </ScrollView>
  );
};

export default NewPasswordScreen;
