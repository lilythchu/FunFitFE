import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import {Agenda} from 'react-native-calendars';
import {useLogin} from '../../../context/AuthProvider';
import {addDayFollow} from '../../../utils/methods';
import client from '../../../api/client';

const CalendarScreen = () => {
  const {token} = useLogin();
  const [reminder, setReminder] = useState({});
  const [daysFollow, setDaysFollow] = useState({});

  const getDaysFollow = () => {
    client
      .get('/user/getDaysFollow', {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(res => {
        for (let k in res.data) {
          res.data[k] = res.data[k].map(item => {
            return {
              name: item,
              type: 'Completed',
            }
          })       
        }
        setDaysFollow(res.data);
      })
      .catch(err => console.log(err.response));
  }

  const getReminder = () => {
    client
      .get('/user/getReminderList', {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(res => {
        for (let k in res.data) {
          res.data[k] = res.data[k].map(item => {
            return {
              name: item,
              type: 'Reminder',
            }
          })       
        }
        setReminder(res.data);
      })
      .catch(err => console.log(err.response));
  }

  const merge = async () => {
    const first = await getDaysFollow();
    const second = getReminder();
    console.log(first);
    setItems(mergeObjects(first, second));
  }

  useEffect(() => {
    getDaysFollow();
    getReminder();
  }, []);

  const renderItem = (item) => {
    return (
      <View style={styles.itemContainer}>
        <Text>{item.name}</Text>
        <Text style={{
          paddingTop: 10,
          color: item.type === 'Completed' ? 'green' : 'orange',}}>
          {item.type}
        </Text>
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
        items={{...daysFollow, ...reminder}}
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
