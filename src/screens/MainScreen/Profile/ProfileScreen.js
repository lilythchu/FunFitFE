import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import { globalStyles } from '../../../../styles/global';
import { useLogin } from '../../../../context/AuthProvider.js'
import { ListItem, Icon, Avatar, Switch, Overlay } from '@rneui/themed';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import { useForm } from 'react-hook-form';
import { updateProfileURL } from '../../../../api/client';
import globalColors from '../../../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import GenreChip from '../../../components/GenreChip';
import axios from 'axios';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {setIsLoggedIn, profile, token, setProfile} = useLogin();
  const [expanded, setExpanded] = useState(false);
  const {control, handleSubmit} = useForm();
  const [switch1, setSwitch1] = useState(true);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const interests = [];

  const toggleOverlay = () => {
    setVisible(!visible);
  }

  const handleLogOut = () => {
    setIsLoggedIn(false);
  }
  const updateUserInfo = data => {
    setLoading(true);
    axios
      .post(updateProfileURL, data, {headers: {"Authorization": `Bearer ${token}`}})
      .then(response => {
        setProfile(response.data);
        setLoading(false);
        setExpanded(false);
      })
      .catch(error => console.log(error));
  }
  const onChangeInterests = () => {
    setLoading2(true);
    axios
      .post(updateProfileURL, 
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
        <View style={styles.userImage}>
          <Avatar 
            size={90}
            rounded
            title={profile.name.charAt(0).toUpperCase()}
            containerStyle={{backgroundColor: globalColors.navyBlue}}
          >
            {/* <Avatar.Accessory
              size={23}
              name="camera"
              type="feather"
            />   */}
          </Avatar>
        </View>

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
              {/* <CustomInput 
                name="sex"
                type='THIRD'
                leftIcon={<Text>Gender</Text>}
                control={control}
                placeholder="Male/Female/Others"
              /> */}
              <CustomInput 
                name="age"
                leftIcon={<Text>Age</Text>}
                keyboardType='numeric'
                type='THIRD'
                placeholder="Age"
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
        <View style={styles.moreContainer}>
          {/* Title */}
          <ListItem bottomDivider containerStyle={globalStyles.roundTitle}>
            <Icon name='list' type='feather'/>
            <ListItem.Title>More</ListItem.Title>
          </ListItem>

          {/* About us */}
          <ListItem bottomDivider Component={TouchableOpacity}>
            <Icon name='info' type='feather'/>
            <ListItem.Content>
              <ListItem.Title>About us</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color='black' />
          </ListItem>

          {/* Terms and Condition */}
          <ListItem bottomDivider Component={TouchableOpacity} >
            <Icon name='lightbulb-outline' />
            <ListItem.Content>
              <ListItem.Title>Terms and Conditions</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color='black' />
          </ListItem>
        </View>

        {/* Log out */}
        <ListItem Component={TouchableHighlight} onPress={handleLogOut}>
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
  userImage: {
    alignItems: 'center',
    marginTop: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  settingContainer: {
    marginVertical: 20,
  },
  moreContainer: {
    marginVertical: 20,
  },
  accordionContainer: {
    marginHorizontal: 30,
    padding: 10,
    borderRadius: 20,
    backgroundColor: globalColors.cream,
  },
});