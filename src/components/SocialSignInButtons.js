import React from 'react';
import {View} from 'react-native';
import CustomButton from './CustomButton';

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
        text="Sign in with Facebook"
        iconType="facebook"
        type="FOURTH"
        onPress={onSignInFacebook}
      />
      <CustomButton
        text="Sign in with Google"
        iconType="google"
        type="FIFTH"
        onPress={onSignInGoogle}
      />
    </View>
  );
};

export default SocialSignInButtons;
