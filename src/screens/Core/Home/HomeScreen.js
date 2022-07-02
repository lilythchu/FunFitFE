import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {ListItem} from '@rneui/themed';
import Feather from 'react-native-vector-icons/Feather';
import MyRoutineItem from '../../../components/Home/MyRoutineItem';
import RecRoutineItem from '../../../components/Home/RecRoutineItem';
import CustomSwiper from '../../../components/CustomSwiper';

import globalColors from '../../../../styles/colors';
import globalStyles from '../../../../styles/global';
import {useNavigation} from '@react-navigation/native';
import {useLogin} from '../../../../context/AuthProvider';
import client from '../../../../api/client';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {token} = useLogin();
  const [recData, setRecData] = useState([]);
  const [myData, setMyData] = useState([]);

  const getMyData = () => {
    client
      .get('/routine/getMyRoutines', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        setMyData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getRecData = () => {
    client
      .get('routine/getRecRoutines', {
        headers: {Authorization: `Bearer ${token}`},
      })
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
  }, [myData]);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.scrollView}>
        {/*Header*/}
        <View style={styles.menuWrapper}>
          <Feather name="menu" size={32} color="black" />
          <Text style={styles.heading}>FunFit</Text>
        </View>

        {/* Swiper */}
        <CustomSwiper />

        {/* Recommended */}
        <View style={styles.discoverWrapper}>
          {/* Title */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Recommended', {token})}>
            <ListItem>
              <ListItem.Content>
                <ListItem.Title style={styles.titleText}>
                  Discover
                </ListItem.Title>
              </ListItem.Content>
              <Feather name="chevron-right" size={24} color="black" />
            </ListItem>
          </TouchableOpacity>

          {/* List */}
          <View style={styles.discoverItemsWrapper}>
            {recData && (
              <FlatList
                data={recData}
                renderItem={({item}) => (
                  <RecRoutineItem item={item} navigation={navigation} />
                )}
                keyExtractor={item => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
        </View>

        {/* My Routines */}
        <View style={styles.myRoutineWrapper}>
          {/* Title */}
          <ListItem>
            <ListItem.Content>
              <ListItem.Title style={styles.myRoutineTitle}>
                My Routines
              </ListItem.Title>
            </ListItem.Content>
            <TouchableOpacity onPress={() => navigation.navigate('AddRoutine')}>
              <Feather name="plus" size={24} color="black" />
            </TouchableOpacity>
          </ListItem>

          {/* List */}
          <View style={styles.myRoutineItemsWrapper}>
            {myData && (
              <FlatList
                data={myData}
                renderItem={({item}) => (
                  <MyRoutineItem
                    navigation={navigation}
                    item={item}
                    token={token}
                  />
                )}
                keyExtractor={item => item._id}
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
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 10,
  },
  menuWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 32,
    fontWeight: '500',
  },
  discoverWrapper: {
    marginTop: 20,
  },
  discoverItemsWrapper: {
    paddingTop: 20,
  },
  myRoutineWrapper: {
    marginBottom: 20,
  },
  myRoutineTitle: {
    fontSize: 24,
    fontWeight: '500',
  },
  myRoutineItemsWrapper: {
    //paddingVertical: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: globalColors.babyBlue,
  },
});
