import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { ListItem, Icon } from '@rneui/themed';
import NotiCard from '../../components/Mails/NotiCard.js';
import globalStyles from '../../../styles/global.js';
import globalColors from '../../../styles/colors.js';

const NotiScreen = () => {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const deleteAllNoti = () => {
    console.log("delete all");
    setTask(null);
  }

  const handleAddNoti = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeNoti = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
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

      {/* Noti Lists */}
      <View style={styles.notiWrapper}>
        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => completeTask(index)}>
                  <NotiCard />
                </TouchableOpacity>
              )
            })
          }
        </View>
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