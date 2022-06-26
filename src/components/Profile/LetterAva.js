import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar, Icon } from '@rneui/themed';
import globalColors from '../../../styles/colors';

const LetterAva = ({name}) => {
  return (
    <Avatar 
      size={55}
      rounded
      title={name.charAt(0).toUpperCase()}
      containerStyle={{backgroundColor: globalColors.blueGrotto}}
    />
  )
}

export default LetterAva;