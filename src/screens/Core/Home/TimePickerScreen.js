import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Icon, Input} from '@rneui/themed';
import CustomButton from '../../../components/CustomButton';
import Chevron from '../../../components/Chevron';
import globalColors from '../../../../styles/colors';
import globalStyles from '../../../../styles/global';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useLogin} from '../../../../context/AuthProvider';
import client from '../../../../api/client';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const TimePickerScreen = () => {
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));
  const [loading, setLoading] = useState(false);
 
  function showDatePicker() {
    setDatePicker(true);
  };
 
  function showTimePicker() {
    setTimePicker(true);
  };
 
  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  };
 
  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  };

  const navigation = useNavigation();
  const {token} = useLogin();
  const {item} = useRoute().params;
  const onSetReminder = () => {
    const trigger = new Date(date);
    trigger.setHours(time.getHours());
    trigger.setMinutes(time.getMinutes());

    Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder",
        body: `Time for some exercise! ${item.name}`,
      },
      trigger,
    });

    setLoading(true);
    client
      .put('/routine/editRoutine',
        {
          id: item._id,
          reminder: date,
        },
        {headers: {Authorization: `Bearer ${token}`}},
      )
      .then(res => {
        setLoading(false);
        navigation.navigate('Routine');
      })
      .catch(err => console.log(err));
  }
 
  return (
    <View style={styles.mainContainer}>
      <Chevron navigation={navigation} color={globalColors.babyBlue} />
      <Text style={globalStyles.title}>Select a Date & Time</Text>
      <Text style={styles.subtitle}>
        We'll send reminders before your workout so you can prepare.
      </Text>

      <View style={{paddingVertical: 20, paddingHorizontal: 30}}>
        <Input
          label='DATE'
          placeholder='Date'
          value={date.toLocaleDateString()}
          rightIcon={
            <Icon type="feather" name="calendar" onPress={showDatePicker}/>
          }
          disabled
        />

        <Input
          label='TIME'
          placeholder='Time'
          value={time.toLocaleTimeString()}
          rightIcon={
            <Icon type="feather" name="clock" onPress={showTimePicker}/>
          }
          disabled
        />
      </View>

      {datePicker && (
        <DateTimePicker
          value={date}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onDateSelected}
          style={styles.datePicker}
        />
      )}

      {timePicker && (
        <DateTimePicker
          value={time}
          mode={'time'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={false}
          onChange={onTimeSelected}
          style={styles.datePicker}
        />
      )}

      <CustomButton
        title="Confirm"
        type="SECOND"
        loading={loading}
        onPress={onSetReminder}
      />

    </View>
  );
}

export default TimePickerScreen;
 
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  subtitle: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    fontSize: 18,
  },
  // Style for iOS ONLY...
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});