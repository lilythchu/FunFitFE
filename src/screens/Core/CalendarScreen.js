import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {Agenda} from 'react-native-calendars';
import {useLogin} from '../../../context/AuthProvider';
import {addDayFollow} from '../../../utils/methods';
import client from '../../../api/client';

const CalendarScreen = () => {
  const {token} = useLogin();
  const [items, setItems] = useState({});

  const getItems = () => {
    client.get('/user/getCalendarList', {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then(res => {
      if (res.data === "You haven't completed any routine or has any reminder yet") {
        Alert.alert("You haven't completed any routine or has any reminder yet");
      } else {
        setItems(res.data);
      }
    })
    .catch(err => console.log(err));
  }

  useEffect(() => getItems(), [items]);

  const renderItem = (item) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={{color: item[0] === 'C' ? 'green' : 'orange'}}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.safe}> 
      {/* Header */}
      <ListItem bottomDivider>
        <Icon name="calendar" type="feather" size={30} />
        <ListItem.Content>
          <ListItem.Title style={{fontSize: 24}}>Calendar</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      <Agenda
        items={items}
        renderItem={renderItem}
        renderEmptyDate={() => {
          return <View />;
        }}
        renderEmptyData={() => {
          return <View />;
        }}
      />
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  itemContainer: {
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 20,
  },
});
