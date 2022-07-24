import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomSwiper from '../../../components/CustomSwiper';
import RecRoutines from '../../../components/Home/RecRoutines';
import MyRoutines from '../../../components/Home/MyRoutines';
import {useNavigation} from '@react-navigation/native';
import {useLogin} from '../../../../context/AuthProvider';
import globalColors from '../../../../styles/colors';
import globalStyles from '../../../../styles/global';
import client from '../../../../api/client';
import jwtDecode from 'jwt-decode';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { token, setToken, refreshToken } = useLogin();

  // Configure client so that if token is expired, a new token will be generated from refreshToken 
  client.interceptors.request.use(
    (config) => {
      if (config.url !== "/user/login" && config.url !== "/user/signup" 
          && config.url !== "/user/refreshToken" && config.url !== "/user/forgotPassword" 
          && config.url !== "/user/resetPassword") {
          const expired = jwtDecode(token).exp < (Date.now() / 1000);
          if (expired) {
            client.post('/user/refreshToken', {
              refreshToken: refreshToken
            })
            .then(res => {
              setToken(res.data.token)
              config.headers["Authorization"] = 'Bearer ' + res.data.token; 
            }).catch(err => {
              console.log(err.message);
            });
        } 
      }
      return config; 
    },
    (error) => {
      return Promise.reject(error);
    }
  )

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.scrollView}>

        {/*Header*/}
        <View style={styles.menuWrapper}>
          <Text style={styles.heading}>FunFit</Text>
        </View>

        {/* Swiper */}
        <CustomSwiper />

        {/* Recommended */}
        <RecRoutines token={token} navigation={navigation}/>

        {/* My Routines */}
        <MyRoutines token={token} navigation={navigation}/>

      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: globalColors.babyBlue,
  },
});
