import React, { useState, useEffect } from 'react';
import {View, FlatList} from 'react-native';
import StoryItem from './StoryItem';
import client from '../../../api/client';

const Stories = ({navigation, token}) => {
  const [validUser, setValidUser] = useState([]);

  const getUser = () => {
    client
      .get('/story/recommendedFriends', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        res.data.map((item, idx) => {
          client
            .get('/story/getStoriesInfo', {
              headers: {Authorization: `Bearer ${token}`},
              params: {id: item},
            })
            .then(res => setValidUser(prev => [...prev, item]))
            .catch(err => console.log(err.response));
        })
      }) 
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <View style={{paddingLeft: 20, paddingVertical: 5}}>
      <FlatList
        data={validUser}
        keyExtractor={item => item}
        horizontal
        renderItem={({item}) => (
          <StoryItem item={item} navigation={navigation} token={token} />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Stories;

