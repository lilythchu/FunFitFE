import React, {useState} from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {ListItem, Icon, Overlay} from 'react-native-elements';
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import GenreChip from '../../components/Profile/GenreChip';
import {useLogin} from "../../../context/AuthProvider";
import {useForm} from 'react-hook-form';
import globalColors from "../../../styles/colors";
import globalStyles from "../../../styles/global";
import client from "../../../api/client";

const Settings = () => {
  const {profile, setProfile, token} = useLogin();
  const {control, handleSubmit} = useForm();
  const interests = [];
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);  //loading for updating info.
  const [loading2, setLoading2] = useState(false);  //loading for changing workout interests.
  const [visible, setVisible] = useState(false);  // workout interest overlay.
  const toggleOverlay = () => setVisible(!visible)


  const updateUserInfo = data => {
    setLoading(true);
    client
      .put('/user/updateProfile', data, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        setProfile(response.data);
        setExpanded(false);
      })
      .catch(error => Alert.alert("Oops!", "Something went wrong, cannot update info"))
      .finally(() => setLoading(false))
  };

  const onChangeInterests = () => {
    setLoading2(true);
    client
      .put(
        '/user/updateProfile',
        {workoutInterests: interests},
        {headers: {Authorization: `Bearer ${token}`}},
      )
      .then(response => {
        toggleOverlay();
        setProfile(response.data);
      })
      .catch(error => Alert.alert("Oops", "Something went wrong"))
      .finally(() => setLoading2(false))
  };

  return (
      <View style={styles.settingContainer}>
        {/* Title */}
        <ListItem bottomDivider containerStyle={globalStyles.roundTitle}>
          <Icon name="settings" />
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
          bottomDivider>
          <View style={styles.accordionContainer}>
            <CustomInput
              name="name"
              type="THIRD"
              leftIcon={<Text>Name</Text>}
              placeholder={profile.name}
              control={control}
            />
            <CustomInput
              name="lifestyleTarget"
              type="THIRD"
              leftIcon={<Text>Bio</Text>}
              placeholder={profile.lifestyleTarget}
              control={control}
            />
            <CustomInput
              name="age"
              leftIcon={<Text>Age</Text>}
              keyboardType="numeric"
              type="THIRD"
              placeholder={profile.age !== undefined ? profile.age.toString() : ''}
              control={control}
            />
            <CustomButton
              type="SECOND"
              title="Update"
              onPress={handleSubmit(updateUserInfo)}
              loading={loading}
            />
          </View>
        </ListItem.Accordion>

        {/* Workout Interests */}
        <ListItem
          bottomDivider
          Component={TouchableOpacity}
          onPress={() => setVisible(!visible)}>
          <ListItem.Content>
            <ListItem.Title>Change workout interests</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color="black" />
        </ListItem>

        {/* Change Interests Overlay */}
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={globalStyles.overlay}>
          <ScrollView style={globalStyles.scrollView}>
            <GenreChip interests={interests} />
          </ScrollView>
          <CustomButton
            title="Update"
            type="SECOND"
            onPress={onChangeInterests}
            loading={loading2}
          />
        </Overlay>
      </View>
  )
}

export default Settings;

const styles = StyleSheet.create({
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