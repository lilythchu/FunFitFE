import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import Stories from '../../../components/Chats/Stories';
import ChatItem from '../../../components/Chats/ChatItem';
import { useNavigation } from '@react-navigation/native';
import globalColors from '../../../../styles/colors';
import { globalStyles } from '../../../../styles/global';
import { Icon } from '@rneui/themed';
import { StoryItem } from '../../../components/Chats/Stories';

const ChatStoriesScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      {/* Header */}
      <View style={{flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
        <View style={{padding: 10, justifyContent: 'center'}}>
          <Text style={{fontSize: 30}}>Chats</Text>
        </View>
        <StoryItem
          item={{name: 'Your story', photo: require('../../../../assets/images/australia.png')}}    
        />
      </View>

      <Stories navigation={navigation} />
      <ChatItem navigation={navigation} />
    </ScrollView>
  )
}

export default ChatStoriesScreen

const styles = StyleSheet.create({
})