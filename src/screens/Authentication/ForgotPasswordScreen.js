import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

import Pic from '../../../assets/images/forgot.png';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {useLogin} from '../../../context/AuthProvider';
import { EMAIL_REGEX } from '../../../utils/methods';
import globalStyles from '../../../styles/global';
import client from '../../../api/client';

const ForgotPasswordScreen = () => {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [dismiss, setDismiss] = useState(true);
  const [message, setMessage] = useState();

  const onSendPressed = data => {
    setLoading(true);
    client
      .post('/user/forgotPassword', data)
      .then((response) => {
        setLoading(false);
        const userId = response.data.userId;
        navigation.navigate('NewPassword', {userId: userId});
      })
      .catch(error => {
        setLoading(false);
        setDismiss(false);
        const mes = error.response.data;
        if (mes === 'User does not exist') {
          setMessage(mes);
        } else {
          setMessage('Oops! Something went wrong, try again');
        }
      })
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };
  
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={globalStyles.scrollView}>
      <TouchableWithoutFeedback onPress={() => setDismiss(true)}>
        <View style={globalStyles.root}>
          <Image source={Pic} style={globalStyles.logo} resizeMode="contain" />
          
          <Text style={globalStyles.title}>Reset your password</Text>

          <CustomInput
            name="email"
            icon="envelope"
            control={control}
            placeholder="Email"
            rules={{
              required: 'Email is required',
              pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
            }}
          />

          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'red', fontSize: 16}}>{(message && !dismiss) ? message : ''}</Text>
          </View>

          { loading
            ? <ActivityIndicator size="large" style={globalStyles.activityIdicator} />
            : <CustomButton title="Send" onPress={handleSubmit(onSendPressed)} />
          }

          <View style={globalStyles.textLinkContainer}>
            <Text>
              Back to{' '} 
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

export default ForgotPasswordScreen;
