import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { getAllConvosURL } from "../../../api/client";
import { avaGender } from "../../../utils/methods";
import { io } from 'socket.io-client';
import axios from "axios";

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

  useEffect(() => { getConvos() }, []);
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

  const joinRoom = () => {
    socket.emit("join", {chatId: item.convoId})
    navigation.navigate('Chat', {item, socket})
  }

  return (
    <TouchableOpacity style={styles.container} onPress={joinRoom}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{paddingVertical: 15, paddingLeft: 30}} >
          <Image
            style={styles.userImg}
            source={require('../../../assets/images/defaultAva.png')}
          />
        </View>
        <View style={styles.textSection}>
          <View style={styles.userInfoText}>
            <Text style={styles.username}>{item.friend[0].name}</Text>
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
    padding: 15, 
    width: 300,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  userInfoText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 12,
    color: '#666',
  },
  messageText: {
    fontSize: 14,
    color: '#333333',
  },

});