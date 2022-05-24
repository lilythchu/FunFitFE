import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SocialButton = ({
  buttonTitle,
  btnType,
  color,
  backgroundColor,
}) => {
  let bgColor = backgroundColor;
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, {backgroundColor: bgColor}]}
    >
      <View style={styles.iconWrapper}>
        <FontAwesome name={btnType} style={styles.icon} size={22} color={color} />
      </View>
      <View style={styles.btnTxtWrapper}>
        <Text style={[styles.buttonText, {color: color}]}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SocialSignInButtons = () => {
  const onSignInFacebook = () => {
    console.warn('onSignInFacebook');
  };

  const onSignInGoogle = () => {
    console.warn('onSignInGoogle');
  };

  return (
   <View>
      <SocialButton
        buttonTitle="Sign In with Facebook"
        btnType="facebook"
        color="#4867aa"
        backgroundColor="#e6eaf4"
      />
      <SocialButton
        buttonTitle="Sign In with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
      />
    </View>
  );
};

export default SocialSignInButtons;

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 20,
  },
  iconWrapper: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontWeight: 'bold',
  },
  btnTxtWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});
