import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import globalColors from '../../../styles/colors';

const NotiCard = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}
          <Text style={styles.titleIcon}>{item.titleIcon}</Text>
        </Text>
        <Icon
          name='bell'
          type='feather'
          size={20}
          containerStyle={{padding: 5}}
        />
      </View>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  )
}

export default NotiCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalColors.cream,
    borderRadius: 10,
    borderColor: globalColors.babyBlue,
    borderWidth: 1,
    padding: 5,
    marginTop: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  titleIcon: {
    fontSize: 25,
  },
  body: {
    padding: 5,
    fontStyle: 'italic',
  },
})