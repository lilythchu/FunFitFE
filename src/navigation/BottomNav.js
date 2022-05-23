import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import ProfileScreen from '../screens/MainScreen/ProfileScreen';
import ChatScreen from '../screens/MainScreen/ChatScreen';
import CalendarScreen from '../screens/MainScreen/CalendarScreen';
import NotiScreen from '../screens/MainScreen/NotiScreen';
import RoutineScreen from '../screens/MainScreen/RoutineScreen';

const BottomNav = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'routine', title: 'Routine', icon: 'home-variant' },
    { key: 'chat', title: 'Chat', icon: 'message-outline'},
    { key: 'calendar', title: 'Calendar', icon: 'calendar-month' },
    { key: 'notifications', title: 'Notifications', icon: 'bell-outline' },
    { key: 'profile', title: 'Profile', icon: 'account-circle-outline' }, 
  ]);

  const renderScene = BottomNavigation.SceneMap({
    routine: RoutineScreen,
    chat: ChatScreen,
    calendar: CalendarScreen,
    notifications: NotiScreen,
    profile: ProfileScreen,
  });

  return (
    <BottomNavigation
      activeColor='blue'
      barStyle={{backgroundColor: 'white'}}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNav;
