import React, {useState, useEffect} from 'react';
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
import coverImg from '../../../../assets/images/australia.png';
import { globalStyles } from '../../../../styles/global';
import globalColors from '../../../../styles/colors';
import { ProgressBar } from 'react-native-paper';
import RecRoutineItem from '../../../components/RecRoutineItem';
import { ListItem } from '@rneui/themed';
import { useLogin } from '../../../../context/AuthProvider';
import {getRecURL, getMyURL} from '../../../../api/client';
import axios from "axios";
import CustomButton from '../../../components/CustomButton';
import MyRoutineItem from '../../../components/MyRoutineItem';

const RoutineScreen = () => {
  const navigation = useNavigation();
  const {token} = useLogin();
  const [recData, setRecData] = useState([]);
  const [myData, setMyData] = useState([]);

  const getMyData = () => {
    axios
      .get(getMyURL, {headers : {"Authorization": `Bearer ${token}`}})
      .then(response => {
        setMyData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getRecData = () => {
    axios
      .get(getRecURL, {headers : {"Authorization": `Bearer ${token}`}})
      .then(response => {
        setRecData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRecData();
    getMyData();
  }, []);

  const renderMyRoutines= ({item}) => {
    return (
      <MyRoutineItem navigation={navigation} item={item} />
    );
  };

  const renderRecRoutines = ({item}) => {
    return (
      <RecRoutineItem item={item} navigation={navigation} />
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
            {recData && (
              <FlatList
                //data={getRecData()}
                data={recData}
                renderItem={renderRecRoutines}
                keyExtractor={(item) => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
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
            {myData && (
              <FlatList
                data={myData}
                renderItem={renderMyRoutines}
                keyExtractor={(item) => item._id}
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                showsHorizontalScrollIndicator={false}
              />
            )}
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
});