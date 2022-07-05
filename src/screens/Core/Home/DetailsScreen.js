import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../../../components/CustomButton';
import Chevron from '../../../components/Chevron';
import Img from '../../../../assets/images/australia.png';
import globalColors from '../../../../styles/colors';
import globalStyles from '../../../../styles/global';
import {useRoute, useNavigation} from '@react-navigation/native';
import {arrayToString} from '../../../../utils/methods';

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {item} = route.params;
  const onStart = () => {
    navigation.navigate('Video', {item});
  };

  return (
    <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
      {/* Image backgound */}
      <ImageBackground source={Img} style={globalStyles.imageBackground}>
        <Chevron navigation={navigation} color="white" />

        {/* Name & Genre */}
        <View style={styles.titlesWrapper}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <View style={globalStyles.genreWrapper}>
            <Entypo name="battery" size={24} color="white" />
            <Text style={styles.genreText}>{arrayToString(item.genre)}</Text>
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
          {/* <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>TOTAL</Text>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoNum}></Text>
              <Text style={styles.infoSubText}>/weeks</Text>
            </View>
          </View> */}

          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>DIFFICULTY</Text>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoText}>{item.difficulty}</Text>
            </View>
          </View>

          {/* <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>DURATION</Text>
            <View style={styles.infoTextWrapper}>
              <Text style={styles.infoNum}></Text>
              <Text style={styles.infoSubText}>/hours</Text>
            </View>
          </View> */}
        </View>

        {/* Button */}
        <CustomButton type="SECOND" title="Start" onPress={onStart} />
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
  titlesWrapper: {
    marginHorizontal: 20,
    marginBottom: 40,
  },
  itemTitle: {
    fontSize: 28,
    color: 'white',
  },
  genreText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
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
    textTransform: 'capitalize',
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
});
