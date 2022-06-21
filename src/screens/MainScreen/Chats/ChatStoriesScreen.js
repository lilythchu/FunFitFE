import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import Stories from '../../../components/Chats/Stories';
import {Chats} from '../../../components/Chats/ChatItem';
import { useNavigation } from '@react-navigation/native';
import globalColors from '../../../../styles/colors';
import { globalStyles } from '../../../../styles/global';
import { StoryItem } from '../../../components/Chats/Stories';
import userData from '../../../../assets/data/userData';

const ChatStoriesScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}} showsHorizontalScrollIndicator={false}>
      {/* Header */}
      <View style={{flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
        <View style={{padding: 10, justifyContent: 'center'}}>
          <Text style={{fontSize: 30}}>Chats</Text>
        </View>
        {/* <StoryItem
          item={{name: 'Your story', photo: require('../../../../assets/images/australia.png')}}    
          navigation={navigation}  
        /> */}
      </View>

      {/* Stories */}
      <Text style={styles.title}>Stories</Text>
      <Stories navigation={navigation} />

      {/* Suggested Friend List */}
      <Text style={styles.title}>Suggested Friend</Text>
      <View style={{flexDirection: 'row', paddingLeft: 20, paddingBottom: 15}}>
        <FlatList 
          data={userData}
          keyExtractor={item => item.id}
          horizontal
          renderItem={({item}) => (
            <StoryItem item = {item} navigation={navigation} rounded={false} />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Chats */}
      <Text style={styles.title}>Chats</Text>
      <Chats navigation={navigation} />
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