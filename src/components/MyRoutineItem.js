import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/global'
import coverImg from '../../assets/images/australia.png';
import globalColors from '../../styles/colors';
import Feather from 'react-native-vector-icons/Feather';
import { ProgressBar } from 'react-native-paper';
import { deleteRoutineURL, editRoutineURL } from '../../api/client';
import axios from 'axios';

const MyRoutineItem = ({navigation, item, token}) => {
  const onDeleteRoutine= () => {
    const body = {
      "id": item._id
    }
    console.log(item);
    console.log(body);
    console.log(token);
    axios
      .delete(deleteRoutineURL, body, {headers : {"Authorization": `Bearer ${token}`}})
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

  return (
    <View style={globalStyles.myRoutineItemContainer}>
      
      {/* Cover Image */}
      <TouchableOpacity>
        <ImageBackground
          source={coverImg}
          style={globalStyles.myRoutineItem}
          imageStyle={styles.myRoutineItemImage}>
          <Text style={styles.myRoutineItemText}>{item.name}</Text>
        </ImageBackground>
      </TouchableOpacity>

      {/* CRUD icon */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent:'space-between',
          paddingHorizontal: 20,
          marginVertical: 5,
        }}>
        <TouchableOpacity onPress={onDeleteRoutine}>
          <Feather name="trash" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onEditRoutine}>
          <Feather name="edit" size={24}/>
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View>
        <ProgressBar
          progress={item.progress}
          color={globalColors.navyBlue}
          style={{height: 6, borderRadius: 5, marginVertical: 5}}
        />
      </View>
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
})