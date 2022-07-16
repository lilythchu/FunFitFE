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
import {Icon} from 'react-native-elements';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

import ResetPic from '../../../assets/images/newPass.png';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import globalStyles from '../../../styles/global';
import client from '../../../api/client';

const NewPasswordScreen = () => {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();
  const routes = useRoute();
  const [loading, setLoading] = useState(false);
  const [dismiss, setDismiss] = useState(true);
  const [message, setMessage] = useState();
  const [viewPassword, setViewPassword] = useState(false);
  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  const onSubmitPressed = data => {
    const credentails = {
      userId: routes.params.userId,
      code: data.code,
      password: data.newPassword,
    };
    setLoading(true);
    client
      .post('/user/resetPassword', credentails)
      .then(response => {
        setLoading(false);
        navigation.navigate('SignIn');
      })
      .catch(error => {
        setLoading(false);
        setDismiss(false);
        const mes = error.response.data;
        if (mes === 'Invalid password reset token') {
          setMessage(mes);
        } else {
          setMessage('Oops! Something went wrong, try again');
        }
      });
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={globalStyles.scrollView}>
      <TouchableWithoutFeedback onPress={() => setDismiss(true)}>
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
            icon="key"
            control={control}
            rules={{required: 'Code is required'}}
          />

          <CustomInput
            name="newPassword"
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
            placeholder="Enter your new password"
            secureTextEntry={!viewPassword}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password should be at least 8 characters long',
              },
            }}
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
              title="Submit"
              onPress={handleSubmit(onSubmitPressed)}
            />
          )}

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

export default NewPasswordScreen;
