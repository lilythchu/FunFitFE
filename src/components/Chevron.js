import React from 'react';
import {TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import globalStyles from '../../styles/global';

const Chevron = ({navigation, color}) => {
  return (
    <TouchableOpacity
      style={globalStyles.backIcon}
      onPress={() => navigation.goBack()}>
      <Entypo name="chevron-left" size={32} color={color} />
    </TouchableOpacity>
  );
};

export default Chevron;
