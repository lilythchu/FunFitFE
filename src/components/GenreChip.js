import { StyleSheet, Text, ScrollView, View } from 'react-native'
import React from 'react'
import CustomChip from './CustomChip'
import globalColors from '../../styles/colors'

const GenreChip = ({interests}) => {
  return (
    <View style={{justifyContent: 'center'}}>
      <Text style={styles.title}>Choose your workout interests</Text>
      <ScrollView contentContainerStyle={styles.rowContainer} horizontal showsHorizontalScrollIndicator={false}>
        <CustomChip text='cardio' array={interests} />
        <CustomChip text='yoga' array={interests} />
        <CustomChip text='pilates' array={interests} />
      </ScrollView>

      <ScrollView contentContainerStyle={styles.rowContainer} horizontal showsHorizontalScrollIndicator={false}>
        <CustomChip text='no-equipment' array={interests} />
        <CustomChip text='fat-burning' array={interests} />
      </ScrollView>

      <ScrollView contentContainerStyle={styles.rowContainer} horizontal showsHorizontalScrollIndicator={false}>
        <CustomChip text='full-body-workout' array={interests} />
      </ScrollView>
    </View>
  )
}

export default GenreChip

const styles = StyleSheet.create({
  rowContainer: {
    //flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    padding: 20,
    fontSize: 18,
    paddingBottom: 30,
    color: globalColors.navyBlue,
  }
})