import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView, Text} from 'react-native';
import {ListItem, Icon, Overlay} from 'react-native-elements';
import globalStyles from '../../../styles/global';
import globalColors from '../../../styles/colors';

const More = () => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => setVisible(!visible)

  return (
    <View style={styles.moreContainer}>
      {/* Title */}
      <ListItem bottomDivider containerStyle={globalStyles.roundTitle}>
        <Icon name="list" type="feather" />
        <ListItem.Title>More</ListItem.Title>
      </ListItem>

      {/* About us */}
      <ListItem bottomDivider Component={TouchableOpacity} onPress={toggleOverlay}>
        <Icon name="info" type="feather" />
        <ListItem.Content>
          <ListItem.Title>About us</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron color="black" />
      </ListItem>

      {/* Overlay */}
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={globalStyles.overlay}>
        <ScrollView style={globalStyles.scrollView}>
          <Text style={styles.title}>Funfit</Text>
          <Text style={styles.body}>
            Funfit is a mobile application that helps users stick with their workout routines, thus promoting a healthy lifestyle.
          </Text>
        </ScrollView>
      </Overlay>
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  moreContainer: {
    marginVertical: 10,
  },
  title: {
    color: globalColors.babyBlue,
    fontSize: 20,
    fontWeight: '500',
    alignSelf: 'center',
  },
  body: {
    padding: 10,
    textAlign: 'justify',
  },
});
