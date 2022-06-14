import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { ListItem } from '@rneui/themed';
import { globalStyles } from '../../../../styles/global';
import {editRoutineURL} from '../../../../api/client';
import { useLogin } from '../../../../context/AuthProvider';
import { arrayToString } from '../../../../utils/methods';
import axios from 'axios';
import globalColors from '../../../../styles/colors';

const EditRoutineScreen = () => {
  const {token} = useLogin();
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const {control, handleSubmit} = useForm();
  const [number, setNumber] = useState();
  const [loading, setLoading] = useState(false);
  const {item} = useRoute().params;

  const onAddRoutine = data => {
    const body = {
      "id": item._id,
      "name": item.name,
      "duration": item.duration,
      "genre": item.genre,
      "timings": item.timings,
      "steps": item.steps,
    };
    if (data.name !== undefined) {body.name = data.name}
    if (data.duration!== undefined) {body.duration= data.duration}
    if (data.genre !== undefined) {body.genre = data.genre}
    if (steps !== undefined) {body.steps = steps}
    if (timings !== undefined) {body.timings = timings}
    setLoading(true);
    axios
      .put(editRoutineURL, body, {headers : {"Authorization": `Bearer ${token}`}})
      .then(response => {
        setLoading(false);
        navigation.navigate('Routine');
      })
      .catch(error => {
        console.log(error);
      });
  }

  var myLoop = [];
  var steps = [];
  var timings = [];
  
  for (let i = 0; i < number; i++) {
    timings[i] = new Array(3);
    myLoop.push(
      <View style={{flexDirection: 'row'}}> 
        <TextInput
          style={{flex: 1, textAlign: 'center'}}
          placeholder={`Step ${i + 1}`}
          onChangeText={text => steps[i] = text}
        />
        <View style={styles.timingContainer}>
          <TextInput
            style={styles.textBox}
            keyboardType='numeric'
            placeholder='00'
            onChangeText={number => timings[i][0] = number}
          />
          <Text>:</Text>
          <TextInput
            style={styles.textBox}
            keyboardType='numeric'
            placeholder='00'
            onChangeText={number => timings[i][1] = number}
          />
          <Text>:</Text>
          <TextInput
            style={styles.textBox}
            keyboardType='numeric'
            placeholder='00'
            onChangeText={number => timings[i][2] = number}
          />
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={globalStyles.scrollView} showsVerticalScrollIndicator={false}>
      {/* Navigation */}
      <TouchableOpacity
        style={globalStyles.backIcon}
        onPress={() => navigation.goBack()}
      >
        <Entypo name='chevron-left' size={32} color={globalColors.babyBlue} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={[globalStyles.title, {fontSize: 21}]}>Edit my Routine</Text>
      
      {/* Form */}
      <CustomInput 
        name="name"
        placeholder={item.name}
        control={control}
      />
      <CustomInput 
        name="genre"
        placeholder={arrayToString(item.genre)}
        control={control}
      />
      <CustomInput 
        name="duration"
        placeholder={`Duration: ${item.duration}`}
        control={control}
        rightIcon={<Text>/hours</Text>}
      />

      <ListItem.Accordion
        style={{borderWidth: 1}}
        content={
          <ListItem.Content>
            <TextInput 
              placeholder='Number of steps(< 10)'
              onChangeText={number => {
                setNumber(number);
                setExpanded(!expanded);
              }}
            />
          </ListItem.Content>
        }
        isExpanded={expanded}
      >
        <View style={{alignItems: 'center', marginVertical: 10}}>
          {myLoop}
        </View>
      </ListItem.Accordion>
      
      {/* Button */}
      { loading
        ? <ActivityIndicator size="large" style={globalStyles.activityIdicator} />
        : <CustomButton
            title="Update"
            onPress={handleSubmit(onAddRoutine)}
            type="SECOND"
          />
      }
    </ScrollView>
  )
}

export default EditRoutineScreen;

const styles = StyleSheet.create({
  textBox: {
    borderWidth: 1,
    width: 30,
    margin: 5,
    textAlign: 'center',
  },
  timingContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})