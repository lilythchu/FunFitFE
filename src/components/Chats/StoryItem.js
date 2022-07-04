import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Image} from '@rneui/themed';
import {avaGender} from '../../../utils/methods';
import client from '../../../api/client';
      
const StoryItem = ({item, navigation, token}) => {
  const [userInfo, setUserInfo] = useState({});

  const getInfo = () => {
    client
      .get('/user/getUserProfile', {
        headers: {Authorization: `Bearer ${token}`},
        params: {otherId: item},
      })
      .then(res => {
        setUserInfo(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <View style={{width: 75, padding: 5}}>
      <LinearGradient
        colors={['#50b1f2', '#c7c432', '#32c790']}
        style={{padding: 2, borderRadius: 50}}>
        <Image
          source={avaGender(userInfo.sex)}
          containerStyle={[styles.userImage, {borderWidth: 4}]}
          PlaceholderContent={<ActivityIndicator />}
          onPress={() => navigation.navigate('Story', {userInfo, token})}
        />
      </LinearGradient>
      <Text style={styles.username}>{userInfo.name}</Text>
    </View>
  );
};

export default StoryItem;

const styles = StyleSheet.create({
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderColor: '#ffffff',
  },
  username: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
  },
});