import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import LetterAva from "../Profile/LetterAva";
import { getAllConvosURL } from "../../../api/client";
import { avaGender } from "../../../utils/methods";
import { io } from 'socket.io-client';
import axios from "axios";
import globalColors from "../../../styles/colors";

const Chats = ({navigation, token}) => {
  const [convos, setConvos] = useState([]);
  const getConvos = () => {
    axios
      .get(getAllConvosURL, {headers : {"Authorization": `Bearer ${token}`}})
      .then(response => {
        setConvos(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => { getConvos() }, [convos]);
  return (
    <FlatList 
      data={convos}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <ChatItem item = {item} navigation={navigation} token={token} />
      )}
      showsVerticalScrollIndicator={false}
    />
  )
}

const socket = io.connect("https://orbital-funfit.herokuapp.com/chatFunfit");

const ChatItem = ({item, navigation}) => {
  const friendName = item.friend[0].name;
  const joinRoom = () => {
    socket.emit("join", {chatId: item.convoId})
    navigation.navigate('Chat', {item, socket})
  }

  return (
    <TouchableOpacity style={styles.container} onPress={joinRoom}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{paddingLeft: 30, paddingVertical: 10}} >
          <LetterAva name={friendName}/>
        </View>
        <View style={styles.textSection}>
          <View style={styles.userInfoText}>
            <Text style={styles.username}>{friendName}</Text>
            <Text style={styles.postTime}>{item.updateAt}</Text>
          </View>
          <Text style={styles.messageText}>{item.latestMessage}</Text>
        </View>
      </View>
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
    width: 300,
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