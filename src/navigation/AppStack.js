import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import {BottomNavigation} from 'react-native-paper';
import globalColors from '../../styles/colors.js';

import ProfileScreen from '../screens/MainScreen/ProfileScreen.js';
import ChatScreen from '../screens/MainScreen/ChatScreen.js';
import CalendarScreen from '../screens/MainScreen/CalendarScreen.js';
import NotiScreen from '../screens/MainScreen/NotiScreen.js';
import RoutineStack from './RoutineStack.js';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

const AppStack = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
  }

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'routine', title: 'Routine', icon: 'home-variant'},
    {key: 'chat', title: 'Chat', icon: 'message-outline'},
    {key: 'calendar', title: 'Calendar', icon: 'calendar-month'},
    {key: 'notifications', title: 'Notifications', icon: 'bell-outline'},
    {key: 'profile', title: 'Profile', icon: 'account-circle-outline'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    profile: ProfileScreen,
    routine: RoutineStack,
    chat: ChatScreen,
    calendar: CalendarScreen,
    notifications: NotiScreen,
  });

  return (
    <BottomNavigation
      activeColor={globalColors.navyBlue}
      inactiveColor={globalColors.blueGrotto}
      barStyle={{backgroundColor: 'white'}}
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default AppStack;

