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
import { io } from 'socket.io-client';
import axios from "axios";

const Chats = ({navigation, token}) => {
  const [convos, setConvos] = useState([]);
  const getConvos = () => {
    axios
      .get(getAllConvosURL, {headers : {"Authorization": `Bearer ${token}`}})
      .then(response => {
        setConvos(response.data);
        console.log(response.data);
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

const ChatItem = ({item, navigation}) => {

  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={require('../../../assets/images/australia.png')}
        style={styles.image}
      />
      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.friend[0].name}</Text>
          <Text style={styles.text}>{item.updateAt}</Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>
          {item.latestMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 30,
    marginRight: 10,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 3,
  },
  text: {
    color: 'grey',
  }
});