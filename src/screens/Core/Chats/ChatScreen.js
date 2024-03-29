import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Alert, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useLogin} from '../../../../context/AuthProvider';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import client from '../../../../api/client';

const ChatScreen = () => {
  const {token, profile} = useLogin();
  const {item, socket} = useRoute().params;
  const friendId = item.friend[0]._id;
  const friendName = item.friend[0].name;
  const isRendered = useRef(false);

  const [messages, setMessages] = useState([]);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(true);

  const fetchMessages = () => {
    client
      .get('/chat/getAConvo', {
        headers: {Authorization: `Bearer ${token}`},
        params: {convoId: item.convoId},
      })
      .then(res => {
        var Data = [];
        const users = res.data.users;
        const dataMessages = res.data.messages;
        if (dataMessages !== null) {
          for (let i = dataMessages.length - 1; i >= 0; i--) {
            Data.push({
              _id: dataMessages[i]._id,
              user: {
                _id: dataMessages[i].sender,
                name:
                  dataMessages[i].sender === users[0]._id
                    ? users[0].name
                    : users[1].name,
              },
              text: dataMessages[i].content,
              createdAt: dataMessages[i].createdAt,
            });
          }
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, Data),
          );
        }
      })
      .catch(err => Alert.alert("Error", "Cannot get earlier messages"))
      .finally(() => setIsLoadingEarlier(false));
  };

  useEffect(() => {
    initMessages();
  }, []);

  const initMessages = () => {
    fetchMessages();
  };

  useEffect(() => {
    socket.on('receive new message', data => {
      if (data.sender !== friendId) {
        if (!isRendered.current) {
          var mess = {
            _id: data._id,
            user: {
              _id: data.sender,
              name: profile.name,
            },
            text: data.content,
            createdAt: data.createdAt,
          };
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, mess),
          );
        }
      }
    });
    return () => {
      isRendered.current = true;
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    var sendMessage = {
      content: messages[0].text,
      userId: profile._id,
    };
    socket.emit('send new message', sendMessage);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = props => {
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

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      user={{
        _id: profile._id,
        name: profile.name,
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
