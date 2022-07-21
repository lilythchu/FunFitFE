import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import ChatItem from './ChatItem';
import client from '../../../api/client';

const Chats = ({navigation, token}) => {
  const [convos, setConvos] = useState([]);
  const getConvos = () => {
    client
      .get('/chat/getAllConvos', {headers: {Authorization: `Bearer ${token}`}})
      .then(response => setConvos(response.data))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getConvos();
  }, [convos]);
  return (
    <View style={{paddingTop: 10}}>
      <FlatList
        data={convos}
        keyExtractor={item => item.convoId}
        renderItem={({item}) => (
          <ChatItem item={item} navigation={navigation} token={token} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Chats;
