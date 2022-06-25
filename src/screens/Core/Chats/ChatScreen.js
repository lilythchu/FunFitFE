import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import { useRoute } from '@react-navigation/native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ChatScreen = () => {
  const {item, socket} = useRoute().params;
  const friendId = item.friend[0]._id;
  const friendName = item.friend[0].name;

  const isRendered = useRef(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive new message", (data) => {
      if (data.sender !== friendId) {
        if (!isRendered.current) {
          var mess = {
            user: {
              _id: data.sender,
              name: friendName,
            },
            text: data.content,
            createAt: new Date(),
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
          right: { backgroundColor: 'pink', },
          left: {backgroundColor: 'pink'},
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
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      renderUsernameOnMessage={true}
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