import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import GenderAvatars from '../Profile/GenderAvatars';
import client from '../../../api/client';

const Suggested = ({navigation, token}) => {
  const [friendIds, setFriendIds] = useState([]);

  const getRecFriendIds = () => {
    client
      .get('/story/recommendedFriends', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(res => {
        setFriendIds(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRecFriendIds();
  }, []);

  return (
    <View style={{paddingLeft: 20, paddingBottom: 15}}>
      <FlatList
        data={friendIds}
        keyExtractor={item => item.id}
        horizontal
        renderItem={({item}) => (
          <GenderAvatars id={item} navigation={navigation} token={token} />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Suggested;
