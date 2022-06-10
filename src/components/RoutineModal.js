import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import CustomInput from '../components/CustomInput';
import { useForm } from 'react-hook-form';
import { ListItem } from '@rneui/themed';
import { globalStyles } from '../../styles/global';

const RoutineModal = () => {
  const {control, handleSubmit} = useForm();
  const [expanded, setExpanded] = useState(false);
  const [number, setNumber] = useState();

  var myLoop = [];
  var steps = [];
  var timings = [];
  
  for (let i = 0; i < number; i++) {
    myLoop.push(
      <View style={{flexDirection: 'row'}}> 
        <TextInput
          placeholder={`Step ${i + 1}`}
          onChangeText={text => steps[i] = text}
        />
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.textBox}
            placeholder='00'
            onChangeText={number => timings[i][0] = number}
          />
          <Text>:</Text>
          <TextInput
            style={styles.textBox}
            placeholder='00'
            onChangeText={number => timings[i][1] = number}
          />
          <Text>:</Text>
          <TextInput
            style={styles.textBox}
            placeholder='00'
            onChangeText={number => timings[i][2] = number}
          />
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={styles.centeredView} showsVerticalScrollIndicator={false}>
      <Text style={[globalStyles.title, {fontSize: 21}]}>Creat your own Routine</Text>
      <CustomInput 
        name="name"
        placeholder="Name"
        control={control}
        rules={{
          required: "Name is required",
        }}
      />
      <CustomInput 
        name="duration"
        placeholder="Duration"
        control={control}
        rules={{
          required: "Duration is required",
        }}
        rightIcon={<Text>/hours</Text>}
      />

      <ListItem.Accordion
        content={
          <>
            <TextInput 
              placeholder='Number of steps(< 10)'
              onChangeText={number => {
                setNumber(number);
                setExpanded(!expanded);
              }}
            />
          </>
        }
        isExpanded={expanded}
      >
        {myLoop}
      </ListItem.Accordion>
    </ScrollView>
  )
}

export default RoutineModal

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 22
  },
  textBox: {
    borderWidth: 1,
    width: 30,
    margin: 5,
    textAlign: 'center',
  },
})