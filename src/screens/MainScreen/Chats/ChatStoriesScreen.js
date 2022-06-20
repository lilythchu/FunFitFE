import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import Stories from '../../../components/Chats/Stories';
import ChatItem from '../../../components/Chats/ChatItem';
import { useNavigation } from '@react-navigation/native';
import globalColors from '../../../../styles/colors';
import { globalStyles } from '../../../../styles/global';

const ChatStoriesScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={globalStyles.scrollView}>
      <Stories navigation={navigation} />
      <ChatItem navigation={navigation} />
    </ScrollView>
  )
}

export default ChatStoriesScreen

const styles = StyleSheet.create({})