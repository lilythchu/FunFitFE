import React, { useState, useEffect } from "react";
import { Text, Image, View, Pressable, StyleSheet, FlatList } from "react-native";
import userData from "../../../assets/data/userData";

const ChatItem = ({item, navigation}) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('Chat', {item})}>
      <Image
        source={require('../../../assets/images/australia.png')}
        style={styles.image}
      />

        {/* <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}></Text>
        </View> */}

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.text}>time</Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>
          message
        </Text>
      </View>
    </Pressable>
  );
};

export const Chats = ({navigation}) => {
  return (
    <FlatList 
      data={userData}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <ChatItem item = {item} navigation={navigation} />
      )}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default ChatItem;

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
  badgeContainer: {
    backgroundColor: '#3777f0',
    width: 15,
    height: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 45,
    top: 10,
  },
  badgeText: {
    color: 'white',
    fontSize: 12
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