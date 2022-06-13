import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/global'
import coverImg from '../../assets/images/australia.png';
import globalColors from '../../styles/colors';
import Feather from 'react-native-vector-icons/Feather';
import { ProgressBar } from 'react-native-paper';

const MyRoutineItem = ({navigation, item}) => {
  return (
    <View style={globalStyles.myRoutineItemContainer}>
      <TouchableOpacity
        style={globalStyles.myRoutineItemWrapper}
        onPress={() => navigation.navigate('Video', {item})}>
        <ImageBackground
          source={coverImg}
          style={globalStyles.myRoutineItem}
          imageStyle={styles.myRoutineItemImage}>
          <Text style={styles.myRoutineItemText}>{item.name}</Text>
        </ImageBackground>
        <TouchableOpacity>
          <Feather
            name='more-vertical'
            size={24}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          justifyContent:'space-between',
          paddingHorizontal: 40,
          marginBottom: 10,
        }}>
        <Feather name="trash" size={24} />
        <Feather name="edit" size={24}/>
      </View>

      <View style={{paddingRight: 30, paddingLeft: 5}}>
        <ProgressBar
          progress={item.progress}
          color={globalColors.navyBlue}
          style={{height: 6, borderRadius: 5}}
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