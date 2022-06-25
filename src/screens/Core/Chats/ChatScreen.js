import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useLogin } from '../../../../context/AuthProvider';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import globalColors from '../../../../styles/colors';

import { getAConvosURL } from '../../../../api/client';
import axios from 'axios';

const ChatScreen = () => {
  const {token} = useLogin();
  const {item, socket} = useRoute().params;
  const friendId = item.friend[0]._id;
  const friendName = item.friend[0].name;
  const isRendered = useRef(false);

  const [messages, setMessages] = useState([]);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(true);

  const fetchMessages = () => {
    axios
      .get(getAConvosURL, {
        headers: {"Authorization": `Bearer ${token}`},
        params: {convoId: item.convoId}
      })
      .then(res => {
        var Data = [];
        const users = res.data.users;
        const dataMessages = res.data.messages
        if (dataMessages !== null) {
          for (let i = dataMessages.length - 1; i >= 0; i--) {
            Data.push({
              _id: dataMessages[i]._id,
              user: {
                _id: dataMessages[i].sender,
                name: dataMessages[i].sender === users[0]._id
                      ? users[0].name
                      : users[1].name
              },
              text: dataMessages[i].content,
              createdAt: dataMessages[i].createdAt
            })
          }
          setMessages((previousMessages) => 
            GiftedChat.append(previousMessages, Data)
          );
          setIsLoadingEarlier(false);
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    initMessages();
  }, [])

  const initMessages = () => {
    fetchMessages();
  }

  useEffect(() => {
    socket.on("receive new message", (data) => {
      console.log(data);
      if (data.sender !== friendId) {
        if (!isRendered.current) {
          var mess = {
            _id: data._id,
            user: {
              _id: data.sender,
              name: friendName,
            },
            text: data.content,
            createdAt: data.createdAt,
          }
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, mess),
          );
        }
      }
    })
    return () => {
      isRendered.current = true;
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    var sendMessage = {
      content: messages[0].text,
      userId: friendId,
    };
    
    socket.emit("send new message", sendMessage);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle-outline"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="pink"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: globalColors.sent},
          left: {backgroundColor: globalColors.received},
        }}
        textStyle={{
          right: { color: 'black', },
          left: {color: 'black',},
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: friendId,
          name: friendName,
        }}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderUsernameOnMessage={true}
        loadEarlier={isLoadingEarlier}
      />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});