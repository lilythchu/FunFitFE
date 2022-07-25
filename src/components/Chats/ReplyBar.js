import React, {useState} from 'react';
import {TextInput, StyleSheet, View, ActivityIndicator, Keyboard} from 'react-native';
import {Icon} from 'react-native-elements';
import {io} from 'socket.io-client';
import globalColors from '../../../styles/colors';
import client from '../../../api/client';

const ReplyBar = ({token, userId, navigation, profileId}) => {
  const [sendedMessage, onChangeSendedMessage] = useState();
  const [loading, setLoading] = useState(false);

  const initiateConvo = () => {
    client
      .post(
        '/chat/initiateConvo',
        {anotherUserId: userId},
        {headers: {Authorization: `Bearer ${token}`}},
      )
      .then(res => findConvo())
      .catch(err => findConvo());
  }

  const findConvo = () => {
    client
      .get('/chat/getAllConvos', {headers: {Authorization: `Bearer ${token}`}})
      .then(response => {
        const a = response.data
        for (let i in response.data) {
          if (a[i].friend[0]._id === userId) {
            joinRoom(a[i]);
            break;
          }
        }
      })
      .catch(error => setLoading(false));
  }
  
  const joinRoom = (item) => {
    const socket = io.connect('https://orbital-funfit.herokuapp.com/chatFunfit');
    socket.emit('join', {chatId: item.convoId});
    sendAMess(socket);
    onChangeSendedMessage('');
    setLoading(false);
  }

  const sendAMess = (socket) => {
    socket.emit('send new message', {
      content: sendedMessage,
      userId: profileId,
    });
  }

  const onSendRequest = async () => {
    setLoading(true);
    Keyboard.dismiss();
    await initiateConvo();
  }

  return (
    <View style={styles.textInput}>
      <TextInput
        placeholder='Send a message'
        onChangeText={text => onChangeSendedMessage(text)}
        value={sendedMessage}
        style={{flex: 1}}
        clearButtonMode='always'
      />
      {loading ? (
        <ActivityIndicator size='small' />
      ) : (
        <Icon 
          name='send'
          type='feather'
          onPress={onSendRequest}
        />
      )}
    </View>
  )
}

export default ReplyBar;

const styles = StyleSheet.create({
  textInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderRadius: 30,
    position: 'absolute',
    bottom: 10,
    margin: 20,
    backgroundColor: globalColors.cream,
  },
})
