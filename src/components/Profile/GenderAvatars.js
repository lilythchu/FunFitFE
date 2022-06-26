import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Icon } from '@rneui/themed';
import globalColors from '../../../styles/colors';
import { getUserURL } from '../../../api/client';
import { avaGender } from '../../../utils/methods';
import axios from 'axios';

const GenderAvatars = ({id, navigation, token}) => {
  const [info, setInfo] = useState({});
  const getInfo = () => {
    axios
      .get(getUserURL, {
        headers: {"Authorization": `Bearer ${token}`},
        params: {otherId: id}
      })
      .then(res => {
        setInfo(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {getInfo()}, []);

  return (
    <View style={styles.container}>
      <Avatar 
        size={64}
        rounded
        source={avaGender(info.sex)}
        containerStyle={{backgroundColor: 'lightgray'}}
        onPress={() => navigation.navigate('OtherProfile', {info, token})}
      />
      <Text style={styles.username}>{info.name}</Text>
    </View>
  )
}

export default GenderAvatars;

const styles = StyleSheet.create({
  container: {
    padding: 10,

  },
  username: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
    color: globalColors.username,
  },
})