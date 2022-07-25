import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {io} from 'socket.io-client';
import {Dialog, ThemeProvider} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import LetterAva from '../../components/Profile/LetterAva';
import client from '../../../api/client';

const ChatItem = ({item, navigation, token}) => {
  const [visibleDia, setVisibleDia] = useState(false);
  const [loading, setLoading] = useState(false); //for deleting chat
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
    setLoading(true);
    client
      .delete('/chat/deleteConvo', {
        headers: {Authorization: `Bearer ${token}`},
        data: {
          convoId: item.convoId,
          anotherUserId: item.friend[0]._id,
        },
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
        setVisibleDia(false);
      });
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
            <Dialog.Button title="Yes" onPress={deleteConvo} loading={loading} />
            <Dialog.Button title="No" onPress={toggleDialog} />
          </Dialog.Actions>
        </Dialog>
      </ThemeProvider>
    </TouchableOpacity>
  );
};

export default ChatItem;

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