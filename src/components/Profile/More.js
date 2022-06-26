import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from '@rneui/themed';
import globalStyles from '../../../styles/global';

const More = () => {
  return (
    <View style={styles.moreContainer}>
      {/* Title */}
      <ListItem bottomDivider containerStyle={globalStyles.roundTitle}>
        <Icon name='list' type='feather'/>
        <ListItem.Title>More</ListItem.Title>
      </ListItem>

      {/* About us */}
      <ListItem bottomDivider Component={TouchableOpacity}>
        <Icon name='info' type='feather'/>
        <ListItem.Content>
          <ListItem.Title>About us</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron color='black' />
      </ListItem>

      {/* Terms and Condition */}
      <ListItem bottomDivider Component={TouchableOpacity} >
        <Icon name='lightbulb-outline' />
        <ListItem.Content>
          <ListItem.Title>Terms and Conditions</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron color='black' />
      </ListItem>
    </View>
  )
}

export default More;

const styles = StyleSheet.create({
  moreContainer: {
    marginVertical: 10,
  },
});