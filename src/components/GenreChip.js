import { StyleSheet, Text, ScrollView, View } from 'react-native'
import React from 'react'
import CustomChip from './CustomChip'
import globalColors from '../../styles/colors'

const GenreChip = ({interests}) => {
  return (
    <View>
      <Text style={styles.title}>Choose your workout interests</Text>
      <View style={styles.rowContainer}>
        <CustomChip text='cardio' array={interests} />
        <CustomChip text='yoga' array={interests} />
        <CustomChip text='pilates' array={interests} />
      </View>

      <View style={styles.rowContainer}>
        <CustomChip text='no-equipment' array={interests} />
        <CustomChip text='fat-burning' array={interests} />
      </View>

      <View style={styles.rowContainer}>
        <CustomChip text='full-body-workout' array={interests} />
      </View>
    </View>
  )
}

export default GenreChip

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
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