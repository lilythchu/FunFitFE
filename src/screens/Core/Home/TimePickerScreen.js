import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Platform,
  Alert,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Icon, Input} from 'react-native-elements';
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
 
  const showDatePicker = () => setDatePicker(true)
  const showTimePicker = () => setTimePicker(true)
  const onDateSelected = (event, value) => {
    setDate(value);
    setDatePicker(false);
  };
  const onTimeSelected = (event, value) => {
    setTime(value);
    setTimePicker(false);
  };

  async function schedulePushNotification() {
    const hasPushNotificationPermissionGranted = await allowsNotificationsAsync()
    if (!hasPushNotificationPermissionGranted) {
      await requestPermissionsAsync();
    }
      const trigger = new Date(date)
      trigger.setHours(time.getHours());
      trigger.setMinutes(time.getMinutes());
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Exercise Reminder',
          body: `${item.name} is due today`,
        },
        trigger,
      });
  }

  const navigation = useNavigation();
  const {token} = useLogin();
  const {item} = useRoute().params;
  const onSetReminder = () => {
    schedulePushNotification();
    setLoading(true);
    client
      .put('/routine/addReminder',
        {
          // id: item._id,
          // reminder: date,
          date: date, 
          reminderMessage: `${item.name} is due`
        },
        {headers: {Authorization: `Bearer ${token}`}},
      )
      .then(res => {
        navigation.navigate('Routine');
      })
      .catch(err => Alert.alert("Oops", "Something went wrong, cannot set reminder"))
      .finally(() => setLoading(false))
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

async function allowsNotificationsAsync() {
  const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

async function requestPermissionsAsync() {
  return await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
}
