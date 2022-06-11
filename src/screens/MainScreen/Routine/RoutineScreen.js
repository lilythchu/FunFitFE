import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import CustomSwiper from '../../../components/CustomSwiper';
import profile from '../../../../assets/pf.jpg';
import { globalStyles } from '../../../../styles/global';
import globalColors from '../../../../styles/colors';
import { ProgressBar } from 'react-native-paper';
import RecRoutineItem from '../../../components/RecRoutineItem';
import { ListItem } from '@rneui/themed';
import { useLogin } from '../../../../context/AuthProvider';
import {getRecURL, getMyURL} from '../../../../api/client';
import axios from "axios";
import CustomButton from '../../../components/CustomButton';
import learnMoreData from '../../../../assets/data/learnMoreData';

const RoutineScreen = () => {
  const {token} = useLogin();
  const [recData, setRecData] = useState([]);
  const [myData, setMyData] = useState([]);

  axios
    .get(getMyURL, {headers : {"Authorization": `Bearer ${token}`}})
    .then(response => {
      setMyData(response.data);
    })
    .catch(error => {
      console.log(error);
    });

  axios
    .get(getRecURL, {headers : {"Authorization": `Bearer ${token}`}})
    .then(response => {
      setRecData(response.data);
    })
    .catch(error => {
      console.log(error);
    });

  const navigation = useNavigation();
  const renderMyRoutines= ({item}) => {
    return (
      <View style={globalStyles.myRoutineItemContainer}>
        <TouchableOpacity
          style={globalStyles.myRoutineItemWrapper}
          onPress={() => navigation.navigate('Video', {item})}>
          <ImageBackground
            source={item.image}
            style={globalStyles.myRoutineItem}
            imageStyle={styles.learnMoreItemImage}>
            <Text style={styles.learnMoreItemText}>{item.title}</Text>
          </ImageBackground>
          <TouchableOpacity>
            <Feather
              name='more-vertical'
              size={24}
            />
          </TouchableOpacity>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent:'space-between',
            paddingHorizontal: 40,
            marginBottom: 10,
          }}>
          <Feather name="trash" size={24} />
          <Feather name="edit" size={24}/>
        </View>

        <View style={{paddingRight: 30, paddingLeft: 5}}>
          <ProgressBar
            progress={item.progress}
            color={globalColors.navyBlue}
            style={{height: 6, borderRadius: 5}}
          />
        </View>
      </View>
    );
  };

  const renderRecRoutines = ({item}) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate("Details", {item})}>
        <RecRoutineItem item={item} />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/*Header*/}
        <View style={styles.menuWrapper}>
          <Feather 
            name='menu'
            size={32}
            color='black'
          />
          <Image source={profile} style={styles.profileImage} />
        </View>


        {/* Swiper */}
        <CustomSwiper />

        {/* Recommended */}
        <View style={styles.discoverWrapper}>
          <TouchableOpacity onPress={() => navigation.navigate('Recommended')}>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title style={styles.titleText}>Discover</ListItem.Title>
              </ListItem.Content>
              <Feather
                name='chevron-right'
                size={24}
                color='black'
              />
            </ListItem>
          </TouchableOpacity>

          <View style={styles.discoverItemsWrapper}>
            <FlatList
              data={recData}
              renderItem={renderRecRoutines}
              keyExtractor={(item) => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/* My Routines */}
        <View style={styles.myRoutineWrapper}>
          <ListItem>
            <ListItem.Content>
              <ListItem.Title style={styles.myRoutineTitle}>My Routines</ListItem.Title>
            </ListItem.Content>
            <TouchableOpacity onPress={() => navigation.navigate('AddRoutine')}>
              <Feather
                name='plus'
                size={24}
                color='black'
              />
            </TouchableOpacity>
          </ListItem>

          <View style={styles.myRoutineItemsWrapper}>
            <FlatList
              data={myData}
              renderItem={renderMyRoutines}
              keyExtractor={(item) => item._id}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

export default RoutineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 10,
  },
  menuWrapper: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 32,
    fontWeight: '500',
  },
  discoverWrapper: {
    marginTop: 20,
  },
  discoverItemsWrapper: {
    paddingVertical: 20,
  },
  myRoutineWrapper: {
    marginVertical: 10,
  },
  myRoutineTitle: {
    fontSize: 24,
    fontWeight: '500',
  },
  myRoutineItemsWrapper: {
    //paddingVertical: 10,
  },
  learnMoreItemImage: {
    borderRadius: 20,
  },
  learnMoreItemText: {
    fontSize: 18,
    color: 'white',
    marginHorizontal: 10,
    marginVertical: 20,
  },
});