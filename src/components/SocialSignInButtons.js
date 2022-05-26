import React from 'react';
import {View} from 'react-native';
import CustomButton from './CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SocialSignInButtons = () => {
  const onSignInFacebook = () => {
    console.warn('onSignInFacebook');
  };

  const onSignInGoogle = () => {
    console.warn('onSignInGoogle');
  };

  return (
    <View>
      <CustomButton
        title="Sign in with Facebook"
        type="FOURTH"
        onPress={onSignInFacebook}
        icon={<FontAwesome name="facebook" size={22} color="#4867aa"/>}
      />
      <CustomButton
        title="Sign in with Google"
        type="FIFTH"
        onPress={onSignInGoogle}
        icon={<FontAwesome name="google" size={22} color="#de4d41" />}
      />
    </View>
  );
};

export default SocialSignInButtons;
