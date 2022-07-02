import React from 'react';
import {Avatar} from '@rneui/themed';
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
