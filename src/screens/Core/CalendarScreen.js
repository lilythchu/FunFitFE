import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ListItem, Icon} from '@rneui/themed';
import {Agenda} from 'react-native-calendars';
import {useLogin} from '../../../context/AuthProvider';
import axios from 'axios';

const CalendarScreen = () => {
  const {token} = useLogin();
  const [items, setItems] = useState({});

  useEffect(() => {
    const getData = () => {
      axios
        .get('https://orbital-funfit.herokuapp.com/user/getDaysFollow', {
          headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => setItems(res.data))
        .catch(err => console.log(err.response));
    };
    getData();
  }, [items]);

  const renderItem = (item) => {
    return (
      <View style={styles.itemContainer}>
        <Text>{item}</Text>
        <Text style={{paddingTop: 10, color: 'green'}}>Completed!!</Text>
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
