import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ScrollView
} from 'react-native';
import {Overlay, ListItem, Dialog, ThemeProvider} from '@rneui/themed';
import { ProgressBar } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import CustomButton from '../CustomButton';
import coverImg from '../../../assets/images/australia.png';
import globalStyles from '../../../styles/global';
import globalColors from '../../../styles/colors';
import { arrayToSteps, arrayToString, arrayToTime } from '../../../utils/methods';
import { deleteRoutineURL, editRoutineURL } from '../../../api/client';
import axios from 'axios';

const MyRoutineItem = ({navigation, item, token}) => {
  const [visible, setVisible] = useState(false);
  const [visibleDia, setVisibleDia] = useState(false);
  const toggleDialog = () => {
    setVisibleDia(!visibleDia);
  }
  const toggleOverlay = () => {
    setVisible(!visible);
  }
  const onDeleteRoutine= () => {
    axios
      .delete(deleteRoutineURL, {
        headers : {"Authorization": `Bearer ${token}`},
        data: {id: item._id}
      })
      .then(response => {
        navigation.navigate('Routine');
      })
      .catch(error => {
        console.log(error);
      });
  }

  const onEditRoutine = data => {
    axios
      .put(editRoutineURL, data, {headers : {"Authorization": `Bearer ${token}`}})
      .then(response => {
        navigation.navigate('Routine');
      })
      .catch(error => {
        console.log(error);
      });
  }

  const myRoutineDetail = () => {
    setVisible(!visible);
  }

  return (
    <View style={globalStyles.myRoutineItemContainer}>
      
      {/* Cover Image */}
      <TouchableOpacity onPress={myRoutineDetail}>
        <ImageBackground
          source={coverImg}
          style={globalStyles.myRoutineItem}
          imageStyle={styles.myRoutineItemImage}>
          <Text style={styles.myRoutineItemText}>{item.name}</Text>
        </ImageBackground>
      </TouchableOpacity>

      {/* CRUD icon */}
      <View style={styles.crudIcon}>
        <TouchableOpacity onPress={toggleDialog}>
          <Feather name="trash" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('EditRoutine', {item})}>
          <Feather name="edit" size={24}/>
        </TouchableOpacity>
      </View>

      {/* Delete Routine Dialog */}
      <ThemeProvider>
        <Dialog 
          isVisible={visibleDia}
          onBackdropPress={toggleDialog}
          overlayStyle={{borderRadius: 15}}
        >
          <Dialog.Title title='Are you sure want to delete' />
          <Dialog.Actions>
            <Dialog.Button title='Yes' onPress={onDeleteRoutine}/>
            <Dialog.Button title='No' onPress={toggleDialog}/>
          </Dialog.Actions>
        </Dialog>
      </ThemeProvider>

      {/* Routines Details */}
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={globalStyles.overlay}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={globalStyles.title}>{item.name}</Text>

          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.listTitle}>
                Duration:
              </ListItem.Title>
            </ListItem.Content>
            <Text>{arrayToTime(item.duration)}</Text>
          </ListItem>
          
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.listTitle}>
                Genre:
              </ListItem.Title>
            </ListItem.Content>
            <Text>{arrayToString(item.genre)}</Text>
          </ListItem>
          
          <ListItem bottomDivider>
              <ListItem.Title style={styles.listTitle}>
                Steps:
              </ListItem.Title>
          </ListItem>
          <View style={{paddingHorizontal: 20}}>
            {arrayToSteps(item.steps, item.timings)}
          </View>
        </ScrollView>
        <CustomButton
          type='SECOND'
          title='Play'
          onPress={() => {
            if (item.steps[0] === undefined) {
              alert('Have you created steps')
            } else {
              navigation.navigate("Audio", {item})
            }
          }}
        />
      </Overlay>

      {/* Progress Bar */}
      {/* <View>
        <ProgressBar
          progress={item.progress}
          color={globalColors.navyBlue}
          style={{height: 6, borderRadius: 5, marginVertical: 5}}
        />
      </View> */}
    </View>
  )
}

export default MyRoutineItem

const styles = StyleSheet.create({
  myRoutineItemImage: {
    borderRadius: 20,
  },
  myRoutineItemText: {
    fontSize: 18,
    color: 'white',
    marginHorizontal: 10,
    marginVertical: 20,
  },
  crudIcon: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: globalColors.cream,
  },
  listTitle: {
    fontWeight: 'bold',
  }
})