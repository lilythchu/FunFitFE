import React from 'react';
import {Avatar} from 'react-native-elements';
import globalColors from '../../../styles/colors';

const LetterAva = ({name}) => {
  return (
    <Avatar
      size={55}
      rounded
      title={name.charAt(0).toUpperCase()}
      containerStyle={{backgroundColor: globalColors.blueGrotto}}
    />
  );
};

export default LetterAva;
