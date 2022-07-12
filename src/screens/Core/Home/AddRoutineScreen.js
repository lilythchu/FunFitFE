import React, {useState} from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {ListItem} from '@rneui/themed';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import TimeInput from '../../../components/TimeInput';

import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {useLogin} from '../../../../context/AuthProvider';
import globalStyles from '../../../../styles/global';
import globalColors from '../../../../styles/colors';
import client from '../../../../api/client';

const AddRoutineScreen = () => {
  const {token} = useLogin();
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const {control, handleSubmit} = useForm();
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const onAddRoutine = data => {
    setLoading(true);
    for (let i = 0; i < number; i++) {
      timings[i][0] = data[`h${i}`];
      timings[i][1] = data[`min${i}`];
      timings[i][2] = data[`sec${i}`];
    }
    const body = {
      name: data.name,
      duration: [data.hdur, data.mindur, data.secdur],
      genre: data.genre,
      steps: steps,
      timings: timings,
    };
    client
      .post('/routine/newRoutine', body, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => navigation.navigate('Routine'))
      .catch(error => Alert.alert("Oops", "Something went wrong"))
      .finally(() => setLoading(false));
  };
  var myLoop = [];
  var steps = [];
  var timings = [];

  for (let i = 0; i < number; i++) {
    steps[i] = `Step ${i + 1}`;
    timings[i] = ['00', '00', '00'];
    myLoop.push(
      <View style={{flexDirection: 'row'}} key={i}>
        <TextInput
          style={{flex: 1, textAlign: 'center'}}
          placeholder={`Step ${i + 1}`}
          onChangeText={text => (steps[i] = text)}
        />
        <TimeInput control={control} num={i} />
      </View>,
    );
  }

  return (
    <ScrollView
      style={globalStyles.scrollView}
      showsVerticalScrollIndicator={false}>
      {/* Navigation */}
      <TouchableOpacity
        style={globalStyles.backIcon}
        onPress={() => navigation.goBack()}>
        <Entypo name="chevron-left" size={32} color={globalColors.babyBlue} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={[globalStyles.title, {fontSize: 21}]}>
        Creat your own Routine
      </Text>

      {/* Form */}
      <CustomInput
        name="name"
        placeholder="Name"
        type="THIRD"
        leftIcon={<Text style={{fontSize: 16}}>Name</Text>}
        control={control}
        rules={{
          required: 'Name is required',
        }}
      />
      <CustomInput
        name="genre"
        type="THIRD"
        leftIcon={<Text style={{fontSize: 16}}>Genre</Text>}
        placeholder="Genre"
        control={control}
        rules={{
          required: 'Genre is required',
        }}
      />
      <View style={globalStyles.durationContainer}>
        <Text style={{fontSize: 16}}>Duration</Text>
        <TimeInput control={control} num="dur" />
      </View>

      <ListItem.Accordion
        style={{borderWidth: 1}}
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

      {/* Button */}
      <CustomButton
        title="Create"
        onPress={handleSubmit(onAddRoutine)}
        type="SECOND"
        loading={loading}
      />
    </ScrollView>
  );
};

export default AddRoutineScreen;
