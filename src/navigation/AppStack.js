import * as React from 'react';
import { StyleSheet } from 'react-native';
import {BottomNavigation} from 'react-native-paper';
import ProfileScreen from '../screens/MainScreen/ProfileScreen.js';
import ChatScreen from '../screens/MainScreen/Chats/ChatScreen.js';
import CalendarScreen from '../screens/MainScreen/CalendarScreen.js';
import NotiScreen from '../screens/MainScreen/NotiScreen.js';
import globalColors from '../../styles/colors.js';
import RoutineStack from './RoutineStack.js';
import ChatStack from './ChatStack.js';

const AppStack = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    //{key: 'routine', title: 'Routine', icon: 'home-variant'},
    {key: 'chat', title: 'Chat', icon: 'message-outline'},
    {key: 'calendar', title: 'Calendar', icon: 'calendar-month'},
    {key: 'notifications', title: 'Notifications', icon: 'bell-outline'},
    {key: 'profile', title: 'Profile', icon: 'account-circle-outline'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    profile: ProfileScreen,
    //routine: RoutineStack,
    //chat: ChatScreen,
    chat: ChatStack,
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
