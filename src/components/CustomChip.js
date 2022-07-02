import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Chip, ThemeProvider} from '@rneui/themed';
import globalColors from '../../styles/colors';

const CustomChip = ({text, icon, array, ...props}) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <ThemeProvider>
      {!isSelected ? (
        <Chip
          title={text}
          buttonStyle={styles.container}
          titleStyle={{color: 'gray'}}
          onPress={() => {
            setIsSelected(!isSelected);
            array.push(text);
          }}
          {...props}
        />
      ) : (
        <Chip
          title={text}
          icon={{
            name: 'x',
            type: 'feather',
            size: 14,
            color: 'white',
          }}
          iconRight
          buttonStyle={[styles.container, {backgroundColor: 'lightcoral'}]}
          onPress={() => {
            setIsSelected(!isSelected);
            array.pop(text);
          }}
          {...props}
        />
      )}
    </ThemeProvider>
  );
};

export default CustomChip;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 5,
    height: 40,
    backgroundColor: globalColors.inactive,
  },
});
