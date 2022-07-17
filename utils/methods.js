import {useState} from 'react';
import {Alert} from 'react-native';
import {ListItem, Text, ThemeProvider, Dialog} from 'react-native-elements';
import female from '../assets/images/female.jpg';
import male from '../assets/images/male.jpg';
import others from '../assets/images/others.jpg';
import client from '../api/client';

export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export function arrayToString(a) {
  if (a === undefined) return "Oops";
  let res = a[0];
  for (let i = 1; i < a.length; i++) {
    res = res + ', ' + a[i];
  }
  return res;
}

export function arrayToTime(arr) {
  if (arr === undefined) return "Oops";
  let res = arr[0];
  for (let i = 1; i < arr.length; i++) {
    res = res + ' : ' + arr[i];
  }
  return res;
}

export function arrayToSteps(step, timing) {
  if (step === undefined || timing === undefined) return "Oops";
  var res = [];
  for (let i = 0; i < step.length; i++) {
    res.push(
      <ListItem bottomDivider key={i}>
        <ListItem.Content>
          <ListItem.Title>{step[i]}</ListItem.Title>
        </ListItem.Content>
        <Text>{arrayToTime(timing[i])}</Text>
      </ListItem>
    );
  }
  return res;
}

export function arrayToSum(time) {
  if (time === undefined) return "Oops";
  return (
    parseInt(time[0], 10) * 3600 +
    parseInt(time[1], 10) * 60 +
    parseInt(time[2], 10)
  );
}

export function avaGender(str) {
  if (str === 'Male') {
    return male;
  } else if (str === 'Female') {
    return female;
  } else {
    return others;
  }
}

export const addDayFollow = (id, token) => {
  client
    .post(
      '/routine/addDaysFollow',
      {id: id},
      {headers: {Authorization: `Bearer ${token}`}},
    )
    .then(res => Alert.alert("Add days and points successfully"))
    .catch(err => Alert.alert("Oops", "Cannot add days and points"));
};

