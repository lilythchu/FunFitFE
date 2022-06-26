import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { StoryItem } from './Stories';
import GenderAvatars from '../Profile/GenderAvatars';
import { getRecFrdURL } from '../../../api/client';
import axios from 'axios';

const Suggested = ({navigation, token}) => {
  const [friendIds, setFriendIds] = useState([]);

  const getRecFriendIds = () => {
    axios
      .get(getRecFrdURL, {headers: {"Authorization": `Bearer ${token}`}})
      .then(res => {
        setFriendIds(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => { getRecFriendIds() }, []);

  return (
    <View style={{paddingLeft: 20, paddingBottom: 15}}>
      <FlatList 
        data={friendIds}
        keyExtractor={item => item.id}
        horizontal
        renderItem={({item}) => (
          <GenderAvatars id = {item} navigation={navigation} token={token} />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default Suggested

const styles = StyleSheet.create({})