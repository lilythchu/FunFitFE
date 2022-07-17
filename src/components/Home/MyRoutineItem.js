import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import {Overlay, ListItem, Dialog, ThemeProvider, Icon} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import CustomButton from '../CustomButton';
import coverImg from '../../../assets/images/australia.png';

import globalStyles from '../../../styles/global';
import globalColors from '../../../styles/colors';
import {arrayToSteps, arrayToString, arrayToTime} from '../../../utils/methods';
import client from '../../../api/client';

const MyRoutineItem = ({navigation, item, token, type}) => {
  const [visible, setVisible] = useState(false);
  const [visibleDia, setVisibleDia] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleDialog = () => {
    setVisibleDia(!visibleDia);
  };
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const onDeleteRoutine = () => {
    setLoading(true);
    client
      .delete('/routine/deleteRoutine', {
        headers: {Authorization: `Bearer ${token}`},
        data: {id: item._id},
      })
      .then(response => {
        setVisibleDia(false);
      })
      .catch(error => Alert.alert("Oops", "Something went wrong, cannot delete this routine"))
      .finally(() => setLoading(false))
  };

  const myRoutineDetail = () => {
    if (type === "created") {
      setVisible(!visible);
    } else {
      navigation.navigate('Details', {item})
    }
  };

  const setReminder = () => {
    navigation.navigate('TimePicker', {item});
  }

  return (
    <View style={globalStyles.myRoutineItemContainer}>
      {/* Cover Image */}
      <TouchableOpacity onPress={myRoutineDetail}>
        <ImageBackground
          source={type === "created" ? coverImg : {uri: item.thumbnail}}
          style={globalStyles.myRoutineItem}
          imageStyle={styles.myRoutineItemImage}>
          {type === "created" && (<Text style={styles.myRoutineItemText}>{item.name}</Text>)}
        </ImageBackground>
      </TouchableOpacity>

      {/* CRUD icon */}
      <View style={styles.crudIcon}>
        <Icon 
          name="trash"
          type="feather"
          size={24}
          onPress={toggleDialog}
        />
        <Icon 
          name="clock"
          type="feather"
          size={24}
          onPress={setReminder}
        />
        {type === "created" && (
          <Icon 
            name="edit"
            type="feather"
            size={24}
            onPress={() => navigation.navigate('EditRoutine', {item})}
          />
        )}
      </View>

      {/* Delete Routine Dialog */}
      <ThemeProvider>
        <Dialog
          isVisible={visibleDia}
          onBackdropPress={toggleDialog}
          overlayStyle={{borderRadius: 15}}>
          <Dialog.Title title="Are you sure want to delete" />
          <Dialog.Actions>
            <Dialog.Button title="Yes" onPress={onDeleteRoutine} loading={loading} />
            <Dialog.Button title="No" onPress={toggleDialog} />
          </Dialog.Actions>
        </Dialog>
      </ThemeProvider>

      {/* Routines Details */}
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={globalStyles.overlay}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={globalStyles.title}>{item.name}</Text>

          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.listTitle}>
                Duration:
              </ListItem.Title>
            </ListItem.Content>
            <Text>{arrayToTime(item.duration)}</Text>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.listTitle}>Genre:</ListItem.Title>
            </ListItem.Content>
            <Text>{arrayToString(item.genre)}</Text>
          </ListItem>
          <ListItem bottomDivider>
            <ListItem.Title style={styles.listTitle}>Steps:</ListItem.Title>
          </ListItem>
          <View style={{paddingHorizontal: 21}}>
            {arrayToSteps(item.steps, item.timings)}
          </View>
        </ScrollView>
        <CustomButton
          type="SECOND"
          title="Play"
          onPress={() => {
            if (item.steps[0] === undefined) {
              alert('Have you created steps');
            } else {
              navigation.navigate('Audio', {item});
            }
          }}
        />
      </Overlay>
    </View>
  );
};

export default MyRoutineItem;

const styles = StyleSheet.create({
  myRoutineItemImage: {
    borderRadius: 20,
  },
  myRoutineItemText: {
    fontSize: 18,
    color: 'white',
    marginHorizontal: 10,
    marginVertical: 20,
  },
  crudIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: globalColors.cream,
  },
  listTitle: {
    fontWeight: 'bold',
  },
});
