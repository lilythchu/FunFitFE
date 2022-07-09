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
import globalColors from '../../../../styles/colors';
import globalStyles from '../../../../styles/global';
import {useRoute, useNavigation} from '@react-navigation/native';
import {arrayToString} from '../../../../utils/methods';
import {windowWidth} from '../../../../utils/Dimensions';

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
      <ImageBackground
        source={{uri: item.thumbnail}}
        style={styles.imageBackground}
      >
        <Chevron navigation={navigation} color="black" />
      </ImageBackground>

      {/* Description */}
      <View style={styles.descriptionWrapper}>
        <View style={styles.heartWrapper}>
          <Entypo name="heart" size={32} color={globalColors.babyBlue} />
        </View>

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
});
