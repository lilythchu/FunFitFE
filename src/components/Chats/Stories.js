import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import userData from '../../../assets/data/userData';
import { Icon, Image } from '@rneui/themed';

const Stories = ({navigation}) => {
  const renderStoryItem = ({item}) => {
    return (
      <View style={{width: 85, padding: 5}}>
        <LinearGradient 
          //colors={['#bc2a8d', '#e95950', '#fccc63']}
          colors={['#50b1f2', '#c7c432', '#32c790']}
          style={{padding: 2, borderRadius: 50}}
        >
          <Image
            source={item.photo}
            containerStyle={[styles.userImage, {borderWidth: 4}]}
            PlaceholderContent={<ActivityIndicator/>}
            onPress={() => navigation.navigate('Story', {item})}
          />
        </LinearGradient>
        <Text style={styles.userName}>{item.name}</Text>
      </View>
    );
  };
  
  return (
    <View style={{flexDirection: 'row'}}>
      {/* My Account */}
      <View style={{padding: 7}}>
        <Image 
          source={require('../../../assets/images/australia.png')}
          style={styles.userImage}
        />
        <View style={{position: 'absolute'}}>
          <View style={styles.addBtnContainer}>
            <Icon
              name='plus'
              type='feather'
              iconStyle={styles.addBtn}
            />
          </View>
          <Text style={[
            styles.userName,
            {textTransform: 'capitalize'}
          ]}>
            Your story
          </Text>
        </View>
      </View>

      {/* List */}
      <FlatList 
        data={userData}
        keyExtractor={item => item.id}
        horizontal
        renderItem={renderStoryItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default Stories;

const styles = StyleSheet.create({
  userImage: {
    height: 70,
    width: 70,
    borderRadius: 50,
    borderColor: '#ffffff',
  },
  userName: {
    textAlign: 'center',
    fontSize: 12,
    textTransform: 'lowercase',
    marginTop: 5,
  },
  addBtnContainer: {
    marginTop: 55,
    backgroundColor: '#4c68d7',
    marginLeft: 55,
    width: 23,
    height: 23,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: '#ffffff',
    justifyContent: 'center',
  },
  addBtn: {
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
  }
})