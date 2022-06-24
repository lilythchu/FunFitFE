import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Button,
} from 'react-native';
import { ListItem, Icon } from '@rneui/themed';
import NotiCard from '../../components/Mails/NotiCard.js';
import { useNavigation } from '@react-navigation/native';

import globalStyles from '../../../styles/global.js';
import globalColors from '../../../styles/colors.js';


const NotiScreen = () => {
  const navigation = useNavigation();
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([
    {
      title: "Let's get started",
      titleIcon: '️🏋️️🔥',
      body: "Discover our workout library",
      screen: 'Recommended',
    },
    {
      title: "Creat ur own routine",
      titleIcon: '️🚀',
      body: "Let's try and customize by your own",
      screen: 'AddRoutine',
    }
  ]);

  const deleteAllNoti = () => {
    console.log("delete all");
    setTaskItems([]);
  }

  const handleAddNoti = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeNoti = (index, item) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
    navigation.navigate('Home', {screen: item.screen})
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <ListItem bottomDivider>
        <Icon name='bell' type='feather' size={30}/>
        <ListItem.Content>
          <ListItem.Title style={{fontSize: 24}}>Notifications</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      <View>
        {taskItems.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={()=> completeNoti(index, item)}>
              <NotiCard item={item} />
            </TouchableOpacity>
          )
        })}
      </View>

      <TouchableOpacity style={styles.trashContainer} onPress={deleteAllNoti}>
        <Icon name='trash-2' type='feather' size={30}/>
      </TouchableOpacity>
    </View>
  )
}

export default NotiScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, 
    backgroundColor: 'white',
  },
  trashContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    alignItems: 'center',
  },
  notiWrapper: {
    paddingTop: 80,
  },
  item: {
    marginTop: 30,
  },
})
