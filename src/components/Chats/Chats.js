import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {io} from 'socket.io-client';
import {Dialog, ThemeProvider} from '@rneui/themed';
import Feather from 'react-native-vector-icons/Feather';
import LetterAva from '../Profile/LetterAva';
import client from '../../../api/client';

const Chats = ({navigation, token}) => {
  const [convos, setConvos] = useState([]);
  const getConvos = () => {
    client
      .get('/chat/getAllConvos', {headers: {Authorization: `Bearer ${token}`}})
      .then(response => {
        setConvos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
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


const ChatItem = ({item, navigation, token}) => {
  const [visibleDia, setVisibleDia] = useState(false);
  const toggleDialog = () => {
    setVisibleDia(!visibleDia);
  };
  const friendName = item.friend[0].name;
  const joinRoom = () => {
    const socket = io.connect('https://orbital-funfit.herokuapp.com/chatFunfit');
    socket.emit('join', {chatId: item.convoId});
    navigation.navigate('Chat', {item, socket});
  };

  const deleteConvo = () => {
    client
      .delete('/chat/deleteConvo', {
        headers: {Authorization: `Bearer ${token}`},
        data: {
          convoId: item.convoId,
          anotherUserid: item.friend[0]._id,
        },
      })
      .then(res => setVisibleDia(false))
      .catch(err => console.log(err));
  };

  return (
    <TouchableOpacity style={styles.container} onPress={joinRoom}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{paddingLeft: 30, paddingVertical: 10}}>
          <LetterAva name={friendName} />
        </View>
        <View style={styles.textSection}>
          <View style={styles.userInfoText}>
            <Text style={styles.username}>{friendName}</Text>
            <Text style={styles.postTime}>{item.updateAt}</Text>
          </View>
          <Text style={styles.messageText}>{item.latestMessage}</Text>
        </View>
        <Feather
          name="trash"
          onPress={toggleDialog}
          size={20}
          style={{paddingVertical: 10, paddingRight: 20}}
        />
      </View>
      {/* Delete Chat Dialog */}
      <ThemeProvider>
        <Dialog
          isVisible={visibleDia}
          onBackdropPress={toggleDialog}
          overlayStyle={{borderRadius: 15}}>
          <Dialog.Title title="Are you sure want to delete" />
          <Dialog.Actions>
            <Dialog.Button title="Yes" onPress={deleteConvo} />
            <Dialog.Button title="No" onPress={toggleDialog} />
          </Dialog.Actions>
        </Dialog>
      </ThemeProvider>
    </TouchableOpacity>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textSection: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '55%',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
  },
  userInfoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 16,
    fontWeight: '500',
  },
  postTime: {
    fontSize: 12,
    color: '#666',
  },
  messageText: {
    fontSize: 14,
    color: '#333333',
    fontStyle: 'italic',
  },
});
