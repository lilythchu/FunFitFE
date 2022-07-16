import React, { useState } from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {Button, Icon, ThemeProvider} from 'react-native-elements';
import CustomButton from '../../../components/CustomButton';
import Chevron from '../../../components/Chevron';
import globalColors from '../../../../styles/colors';
import globalStyles from '../../../../styles/global';
import {useLogin} from '../../../../context/AuthProvider';
import {useRoute, useNavigation} from '@react-navigation/native';
import {arrayToString} from '../../../../utils/methods';
import {windowWidth} from '../../../../utils/Dimensions';
import client from '../../../../api/client';

const DetailsScreen = () => {
  const navigation = useNavigation();
  const {item, type} = useRoute().params;
  const {token} = useLogin();
  const [loading, setLoading] = useState();

  const onStart = () => {
    navigation.navigate('Video', {item});
  };

  const onAddToLibrary = () => {
    setLoading(true);
    client
      .post('/routine/addToLibrary', 
        {id: item._id},
        {headers: {Authorization: `Bearer ${token}`}},
      )
      .then(res => navigation.navigate('Routine'))
      .catch(err => {
        if (err.response.status === 400) {
          Alert.alert("Oops", "It has already been added to your library");
        } else {
          Alert.alert("Oops", "Something went wrong, cannot add routine to library")
        }
      })
      .finally(() => setLoading(false))
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Image backgound */}
      <ImageBackground
        source={{uri: item.thumbnail}}
        style={styles.imageBackground}
      >
        <Chevron navigation={navigation} color="black" />
      </ImageBackground>

      {/* Description */}
      <View style={styles.descriptionWrapper}>
        {/* Name & Genre */}
        <View style={styles.titlesWrapper}>
          <Text style={styles.itemTitle}>{item.name}</Text>
        </View>

        <View style={styles.descriptionTextWrapper}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>

        {/* Basic routine's information */}
        <View style={styles.infoWrapper}>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>DIFFICULTY</Text>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoText}>{item.difficulty}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>GENRE</Text>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoText}>{arrayToString(item.genre)}</Text>
            </View>
          </View>
        </View>

        {/* Button */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 20,
          alignContent: 'center',
          alignSelf: 'center',
          }}>
          <ThemeProvider>
            {type === "pair" && (
              <Button
                title="Add"
                type="outline"
                titleStyle={{color: globalColors.babyBlue}}
                buttonStyle={styles.button}
                onPress={onAddToLibrary}
                loading={loading}
              />
            )}
            <Button title="Start" onPress={onStart} buttonStyle={[styles.button, {backgroundColor: globalColors.babyBlue}]} />
          </ThemeProvider>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 30,
  },
  imageBackground: {
    height: windowWidth * 0.56,
  },
  titlesWrapper: {
    marginHorizontal: 20,
    marginTop: 50,
  },
  itemTitle: {
    fontSize: 20,
    color: globalColors.navyBlue,
  },
  descriptionWrapper: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: -20,
    borderRadius: 25,
  },
  descriptionTextWrapper: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  descriptionTitle: {
    fontSize: 24,
  },
  descriptionText: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  infoWrapper: {
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  infoItem: {
    marginBottom: 10,
  },
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
    fontSize: 17,
    textTransform: 'capitalize',
    color: globalColors.babyBlue,
  },
  button: {
    width: windowWidth / 2 - 50,
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: globalColors.babyBlue,
  },
});
