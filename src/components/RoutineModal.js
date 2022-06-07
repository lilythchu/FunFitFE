import React, {useState} from 'react';
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import CustomeInput from '../components/CustomInput';
import { useForm } from 'react-hook-form';

const RoutineModal = ({visible}) => {
  const {control, handleSubmit} = useForm();

  return (
    <View style={styles.centeredView}>
        <CustomeInput 
          name='date'
          placeholer='Choose your date'
          control={control}
        />
    </View>
  )
}

export default RoutineModal

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})