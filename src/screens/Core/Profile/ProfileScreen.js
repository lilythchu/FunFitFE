import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Button,
} from 'react-native';
import { ListItem, Icon, Avatar, Switch, Overlay } from '@rneui/themed';
import GenreChip from '../../../components/Profile/GenreChip';
import UserPic from '../../../components/Profile/UserPic';
import More from '../../../components/Profile/More';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import { useLogin } from '../../../../context/AuthProvider.js'
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import globalColors from '../../../../styles/colors';
import globalStyles from '../../../../styles/global';
import client from '../../../../api/client';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {setIsLoggedIn, profile, token, setProfile} = useLogin();
  const {control, handleSubmit} = useForm();
  const [switch1, setSwitch1] = useState(true);

  const handleLogOut = () => {
    setIsLoggedIn(false);
  }

  {/* Methods for updating info */}
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const updateUserInfo = data => {
    setLoading(true);
    client
      .put('/user/updateProfile', data, {headers: {"Authorization": `Bearer ${token}`}})
      .then(response => {
        setProfile(response.data);
        setLoading(false);
        setExpanded(false);
      })
      .catch(error => console.log(error));
  }

  {/* Methods for changing interests */}
  const interests = [];
  const [visible, setVisible] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  }

  const onChangeInterests = () => {
    setLoading2(true);
    client
      .put('/user/updateProfile', 
        {"workoutInterests": interests},
        {headers: {"Authorization": `Bearer ${token}`}}
      )
      .then(response => {
        toggleOverlay();
        setLoading2(false);
        setProfile(response.data);
      })
      .catch(error => console.log(error));
  }

  return (
    <ScrollView style={globalStyles.scrollView} showsVerticalScrollIndicator={false}>
      {/* User Avatar */}
      <UserPic token={token} names={profile.name}/>

      {/* User name and bio */}
      <Text style={styles.userName}>{profile.name}</Text>
      <Text style={styles.aboutUser}>{profile.lifestyleTarget}</Text>
      
      {/* Settings */}
      <View style={styles.settingContainer}>
        {/* Title */}
        <ListItem bottomDivider containerStyle={globalStyles.roundTitle}>
          <Icon name='settings' />
          <ListItem.Title>Settings</ListItem.Title>
        </ListItem>

        {/* Account Settings */}
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title>Account Settings</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded}
          onPress={() => setExpanded(!expanded)}
          bottomDivider
        >
          <View style={styles.accordionContainer}>
            <CustomInput 
              name='name'
              type='THIRD'
              leftIcon={<Text>Name</Text>}
              placeholder={profile.name}
              control={control}
            />
            <CustomInput 
              name='lifestyleTarget'
              type='THIRD'
              leftIcon={<Text>Bio</Text>}
              placeholder={profile.lifestyleTarget}
              control={control}
            />
            <CustomInput 
              name="age"
              leftIcon={<Text>Age</Text>}
              keyboardType='numeric'
              type='THIRD'
              placeholder={profile.age.toString()}
              control={control}
            />
            {loading 
              ? <ActivityIndicator size='large' style={globalStyles.activityIdicator} />
              : <CustomButton
                  type='SECOND'
                  title="Update"
                  onPress={handleSubmit(updateUserInfo)}
                />
            }
          </View>
        </ListItem.Accordion>

        {/* Workout Interests */}
        <ListItem
          bottomDivider
          Component={TouchableOpacity}
          onPress={() => setVisible(!visible)}
        >
          <ListItem.Content>
            <ListItem.Title>Change workout interests</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color='black'/>
        </ListItem>

        {/* Change Interests Overlay */}
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={globalStyles.overlay}
        >
          <ScrollView style={globalStyles.scrollView}>
            <GenreChip interests={interests} />
          </ScrollView>
          
          {loading2
            ? <ActivityIndicator size='large' style={globalStyles.activityIdicator} />
            : <CustomButton
                title="Update"
                type='SECOND'
                onPress={onChangeInterests}
              />
          }
        </Overlay>

        {/* Noti */}
        <ListItem bottomDivider >
          <ListItem.Content>
            <ListItem.Title>Notifications</ListItem.Title>
          </ListItem.Content>
          <Switch 
            value={switch1}
            onValueChange={(value) => setSwitch1(value)}
          />
        </ListItem>

      </View>
      
      {/* More */}
      <More />

      {/* Log out */}
      <ListItem Component={TouchableOpacity} onPress={handleLogOut} containerStyle={{marginBottom: 50}}>
        <ListItem.Content>
          <ListItem.Title>Log out</ListItem.Title>
        </ListItem.Content>
        <Icon name="log-out" type='feather'/>
      </ListItem>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 5,
    textAlign: 'center',
  },
  aboutUser: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  settingContainer: {
    marginVertical: 20,
  },
  accordionContainer: {
    marginHorizontal: 30,
    padding: 10,
    borderRadius: 20,
    backgroundColor: globalColors.cream,
  },
});