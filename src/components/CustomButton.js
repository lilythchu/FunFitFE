import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, ThemeProvider} from '@rneui/themed';
import globalColors from '../../styles/colors';

const CustomButton = ({type = 'FIRST', ...props}) => {
  return (
    <ThemeProvider>
      <Button
        buttonStyle={[styles.btn, styles[`btn_${type}`]]}
        containerStyle={styles.container}
        titleStyle={[styles.title, styles[`title_${type}`]]}
        iconContainerStyle={{marginRight: 10}}
        {...props}
      />
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },

  btn: {
    borderWidth: 0,
    borderRadius: 30,
    borderColor: 'transparent',
  },
  btn_FIRST: {
    backgroundColor: '#68bbe3',
  },
  btn_SECOND: {
    marginHorizontal: 20,
    marginTop: 40,
    backgroundColor: globalColors.babyBlue,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
  },
  btn_THIRD: {
    marginHorizontal: 30,
    backgroundColor: globalColors.babyBlue,
    alignItems: 'center',
    borderRadius: 20,
  },
  btn_FACE: {
    backgroundColor: '#e6eaf4',
  },
  btn_GG: {
    backgroundColor: '#f5e7ea',
  },

  title: {},
  title_FIRST: {
    fontWeight: 'bold',
    color: 'white',
  },
  title_SECOND: {
    fontSize: 18,
    color: 'white',
  },
  title_THIRD: {
    fontSize: 16,
    color: 'white',
  },
  title_FACE: {
    marginLeft: 10,
    fontWeight: '600',
    color: '#4867aa',
  },
  title_GG: {
    marginLeft: 10,
    fontWeight: '600',
    color: '#de4d41',
  },
});

export default CustomButton;
