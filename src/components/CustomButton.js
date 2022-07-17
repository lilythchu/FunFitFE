import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, ThemeProvider} from 'react-native-elements';
import globalColors from '../../styles/colors';
import {windowHeight, windowWidth} from '../../utils/Dimensions';

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

/**
 * - firts: larged-sized
 * - second: medium-sized
 * - third: small rounded corner 
 */

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  btn: {
    borderRadius: 30,
    borderColor: 'transparent',
  },
  btn_FIRST: {
    backgroundColor: '#68bbe3',
  },
  btn_SECOND: {
    alignSelf: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
    marginBottom: 40,
    backgroundColor: globalColors.babyBlue,
    width: windowWidth / 2,
  },
  btn_THIRD: {
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 150,
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
    fontSize: 20,
    color: 'white',
  },
});

export default CustomButton;
