import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import TimeInput from '../../../components/TimeInput';
import Chevron from '../../../components/Chevron';

import {useLogin} from '../../../../context/AuthProvider';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {arrayToString} from '../../../../utils/methods';
import globalColors from '../../../../styles/colors';
import globalStyles from '../../../../styles/global';
import client from '../../../../api/client';

const EditRoutineScreen = () => {
  const {token} = useLogin();
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const {control, handleSubmit} = useForm();
  const [number, setNumber] = useState();
  const [loading, setLoading] = useState(false);
  const {item} = useRoute().params;

  const onAddRoutine = data => {
    for (let i = 0; i < number; i++) {
      timings[i][0] = data[`h${i}`];
      timings[i][1] = data[`min${i}`];
      timings[i][2] = data[`sec${i}`];
    }
    const body = {
      id: item._id,
      duration: [
        data.hdur === undefined ? item.duration[0] : data.hdur,
        data.mindur === undefined ? item.duration[1] : data.mindur,
        data.secdur === undefined ? item.duration[2] : data.secdur,
      ],
    };
    if (data.name !== undefined) {
      body.name = data.name;
    }
    if (data.genre !== undefined) {
      body.genre = data.genre;
    }
    if (steps[0] !== undefined) {
      body.steps = steps;
    }
    if (timings[0] !== undefined) {
      body.timings = timings;
    }
    setLoading(true);
    client
      .put('/routine/editRoutine', body, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => navigation.navigate('Routine'))
      .catch(error => Alert.alert('Oops', 'Something went wrong, cannot edit routine'))
      .finally(() => setLoading(false))
  };

  var myLoop = [];
  var steps = [];
  var timings = [];

  for (let i = 0; i < number; i++) {
    steps[i] = `Step ${i + 1}`;
    timings[i] = new Array(3);
    myLoop.push(
      <View style={{flexDirection: 'row'}} key={i}>
        <TextInput
          style={{flex: 1, textAlign: 'center'}}
          placeholder={`Step ${i + 1}`}
          onChangeText={text => (steps[i] = text)}
        />
        <TimeInput control={control} name={i} />
      </View>,
    );
  }

  return (
    <ScrollView
      style={globalStyles.scrollView}
      showsVerticalScrollIndicator={false}>
      {/* Navigation */}
      <Chevron navigation={navigation} color={globalColors.babyBlue} />

      {/* Title */}
      <Text style={[globalStyles.title, {fontSize: 21}]}>Edit my Routine</Text>

      {/* Form */}
      <CustomInput
        name="name"
        leftIcon={<Text style={{fontSize: 16}}>Name</Text>}
        type="THIRD"
        placeholder={item.name}
        control={control}
      />
      <CustomInput
        name="genre"
        leftIcon={<Text style={{fontSize: 16}}>Genre</Text>}
        type="THIRD"
        placeholder={arrayToString(item.genre)}
        control={control}
      />

      <View style={styles.duration}>
        <Text style={{fontSize: 16}}>Duration</Text>
        <View style={styles.timingContainer}>
          <CustomInput
            type="TIME"
            name="hdur"
            control={control}
            rules={{
              max: {
                value: 10,
                message: 'invalid',
              },
              min: {
                value: 0,
                message: 'invalid',
              },
              maxLength: {
                value: 2, 
                message: '2 digits'
              }
            }}
            keyboardType="numeric"
            placeholder={item.duration[0]}
          />
          <CustomInput
            type="TIME"
            name="mindur"
            control={control}
            rules={{
              max: {
                value: 59,
                message: 'invalid',
              },
              min: {
                value: 0,
                message: 'invalid',
              },
              maxLength: {
                value: 2, 
                message: '2 digits'
              }
            }}
            keyboardType="numeric"
            placeholder={item.duration[1]}
          />
          <CustomInput
            type="TIME"
            name="secdur"
            control={control}
            rules={{
              max: {
                value: 59,
                message: 'invalid',
              },
              min: {
                value: 0,
                message: 'invalid',
              },
              maxLength: {
                value: 2, 
                message: '2 digits'
              }
            }}
            keyboardType="numeric"
            placeholder={item.duration[2]}
          />
        </View>
      </View>

      <ListItem.Accordion
        style={{borderWidth: 1}}
        noIcon
        content={
          <ListItem.Content>
            <TextInput
              keyboardType="numeric"
              placeholder="Number of steps(< 10)"
              onChangeText={num => {
                setNumber(num);
                setExpanded(!expanded);
              }}
            />
          </ListItem.Content>
        }
        isExpanded={expanded}>
        <View style={{alignItems: 'center', marginVertical: 10}}>{myLoop}</View>
      </ListItem.Accordion>

      <CustomButton
        title="Update"
        onPress={handleSubmit(onAddRoutine)}
        type="SECOND"
        loading={loading}
      />
    </ScrollView>
  );
};

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
  duration: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingLeft: 10,
    alignItems: 'center',
  },
});
