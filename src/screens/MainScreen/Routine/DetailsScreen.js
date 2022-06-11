import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useRoute,  useNavigation } from '@react-navigation/native';
import globalColors from '../../../../styles/colors';
import CustomButton from '../../../components/CustomButton';
import { globalStyles } from '../../../../styles/global';
import images from '../../../../assets/images/australia.png';
import { useLogin } from '../../../../context/AuthProvider';
import { addRoutineURL } from '../../../../api/client';
import axios from 'axios';

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {token} = useLogin();
  const {item} = route.params;
  const onAddRoutine = () => {
    axios
      .post(addRoutineURL, item, {headers : {"Authorization": `Bearer ${token}`}})
      .then(response => {
        navigation.navigate('Routine');
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
      {/* Image backgound */}
      <ImageBackground
        //source={images}
        source={item.thumbnail}
        style={globalStyles.imageBackground}>
        <TouchableOpacity
          style={globalStyles.backIcon}
          onPress={() => navigation.goBack()}>
          <Entypo name='chevron-left' size={32} color='white' />
        </TouchableOpacity>

        <View style={styles.titlesWrapper}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <View style={styles.locationWrapper}>
            <Entypo name="battery" size={24} color='white' />
            <Text style={styles.locationText}>{item.genre}</Text>
          </View>
        </View>
      </ImageBackground>
     
      {/* Description */}
      <View style={styles.descriptionWrapper}>
        <View style={styles.heartWrapper}>
          <Entypo name="heart" size={32} color={globalColors.babyBlue} />
        </View>

        <View style={styles.descriptionTextWrapper}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>

        {/* Basic routine's information */}
        <View style={styles.infoWrapper}>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>TOTAL</Text>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoNum}></Text>
              <Text style={styles.infoSubText}>/weeks</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>DIFFICULTY</Text>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoText}>{item.difficulty}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>DURATION</Text>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoNum}></Text>
              <Text style={styles.infoSubText}>/hours</Text>
            </View>
          </View>
        </View>

        <CustomButton 
          type='SECOND'
          title="Add Routine"
          onPress={onAddRoutine}
        />
      </View>

    </ScrollView>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 30,
  },
  titlesWrapper: {
    marginHorizontal: 20,
    marginBottom: 40,
  },
  itemTitle: {
    fontSize: 32,
    color: 'white',
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    fontSize: 16,
    color: 'white',
  },
  descriptionWrapper: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: -20,
    borderRadius: 25,
  },
  heartWrapper: {
    position: 'absolute',
    right: 40,
    top: -30,
    width: 64,
    height: 64,
    backgroundColor: 'white',
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  descriptionTextWrapper: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  descriptionTitle: {
    fontSize: 24,
    color: 'black',
  },
  descriptionText: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray', 
  },
  infoWrapper: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  infoItem: {},
  infoTitle: {
    fontSize: 12,
    color: 'gray',
  },
  infoTextWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 5,
  },
  infoText: {
    fontSize: 18,
    color: globalColors.babyBlue,
  },
  infoNum: {
    fontSize: 24,
    color: globalColors.babyBlue,
  },
  infoSubText: {
    fontSize: 14,
    color: 'gray',
  },
})