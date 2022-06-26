import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import Stories from '../../../components/Chats/Stories';
import MyStories from '../../../components/Chats/MyStories';
import Chats from '../../../components/Chats/Chats';
import Suggested from '../../../components/Chats/Suggested';
import { StoryItem } from '../../../components/Chats/Stories';
import userData from '../../../../assets/data/userData';
import { useLogin } from '../../../../context/AuthProvider';
import { useNavigation } from '@react-navigation/native';

import globalColors from '../../../../styles/colors';
import { globalStyles } from '../../../../styles/global';

const ChatStoriesScreen = () => {
  const navigation = useNavigation();
  const {token} = useLogin();

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}} showsHorizontalScrollIndicator={false}>
      {/* Header */}
      <View style={{flexDirection: 'row', padding: 20, justifyContent: 'space-between'}}>
        <View style={{padding: 10, justifyContent: 'center'}}>
          <Text style={{fontSize: 30}}>Chats</Text>
        </View>
        <MyStories navigation={navigation}/>
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
  )
}

export default ChatStoriesScreen

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '500',
    paddingLeft: 20,
  },
})