import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { globalStyles } from '../../../styles/global'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
  const navigation = useNavigation();
  const handleLogOut = () => {
    navigation.navigate('SignIn');
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.paragraph}>ProfileScreen</Text>
      <Button title='Log out' onPress={handleLogOut}/>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})