import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Chats from '../../../components/Chats/Chats';
import Suggested from '../../../components/Chats/Suggested';
import {useLogin} from '../../../../context/AuthProvider';
import {useNavigation} from '@react-navigation/native';

const ChatStoriesScreen = () => {
  const navigation = useNavigation();
  const {token} = useLogin();

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      showsHorizontalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={{padding: 10, justifyContent: 'center'}}>
          <Text style={{fontSize: 30}}>Chats</Text>
        </View>
        {/* <MyStories navigation={navigation}/> */}
        <Feather name="message-circle" size={27} style={{padding: 10}} />
      </View>

      {/* Stories */}
      {/* <Text style={styles.title}>Stories</Text>
      <Stories navigation={navigation} /> */}

      {/* Suggested Friend List */}
      <Text style={styles.title}>Suggested Friends</Text>
      <Suggested navigation={navigation} token={token} />

      {/* Chats */}
      <Text style={styles.title}>Messages</Text>
      <Chats navigation={navigation} token={token} />
    </ScrollView>
  );
};

export default ChatStoriesScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    paddingLeft: 20,
    marginBottom: 10,
  },
});
