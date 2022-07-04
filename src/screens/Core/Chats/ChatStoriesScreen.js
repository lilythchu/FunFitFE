import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Chats from '../../../components/Chats/Chats';
import Suggested from '../../../components/Chats/Suggested';
import Stories from '../../../components/Chats/Stories';
import MyStories from '../../../components/Chats/MyStories';
import {useLogin} from '../../../../context/AuthProvider';
import {useNavigation} from '@react-navigation/native';

const ChatStoriesScreen = () => {
  const navigation = useNavigation();
  const {token, profile} = useLogin();

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={{padding: 10, justifyContent: 'center'}}>
          <Text style={{fontSize: 30}}>Chats</Text>
        </View>
        <MyStories token={token} navigation={navigation} userInfo={profile} />
      </View>

      {/* Stories */}
      <Text style={styles.title}>Stories</Text>
      <Stories navigation={navigation} token={token} />

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
    paddingVertical: 10,
  },
});
