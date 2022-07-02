import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar} from '@rneui/themed';
import img from '../../../assets/images/australia.png';

const MyStories = ({navigation}) => {
  const newStories = () => {
    console.log('new stories');
  };

  return (
    <View>
      <Avatar
        size={64}
        rounded
        source={img}
        containerStyle={{backgroundColor: 'grey'}}>
        <Avatar.Accessory
          name="plus"
          type="feather"
          size={23}
          onPress={newStories}
        />
      </Avatar>
    </View>
  );
};

export default MyStories;