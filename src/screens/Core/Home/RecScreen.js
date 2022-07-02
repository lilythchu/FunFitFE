import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RecCard from '../../../components/Home/RecCard';
import CustomButton from '../../../components/CustomButton';
import Chervon from '../../../components/Chervon';

import categoriesData from '../../../../assets/data/categoriesData';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLogin } from '../../../../context/AuthProvider';
import globalStyles from '../../../../styles/global';
import client from '../../../../api/client';

const RecScreen = () => {
  const navigation = useNavigation();
  const {token} = useLogin();
  const [recData, setRecData] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [loading, setLoading] = useState(false);

  const getByGenre = (genre) => {
    setLoading(true);
    client.get('/routine/getRoutinesByGenre', {
        headers: {"Authorization": `Bearer ${token}`},
        params: {genre: genre}
      })
      .then(res => {
        setRecData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  const CategoryList = () => {
    const renderCategoryItem = ({item}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setSelectedId(item.id);
            getByGenre(item.title);
          }}
          style={styles.categoryItemWrapper}>
          <Text
            style={[
              styles.categoryItemText,
              {
                color: item.id === selectedId ? 'orange' : 'gray'
              },
            ]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.categoryWrapper}>
        <View style={styles.categoryItemsWrapper}>
          <FlatList
            data={categoriesData}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            extraData={selectedId}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, padding: 20, backgroundColor: 'white'}}>
      <CategoryList />
      { 
        loading
          ? <ActivityIndicator size='large' />
          : <FlatList
              data={recData}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item._id}
              renderItem={({item}) => (
                <RecCard item={item} navigation={navigation} />
              )}
            />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  categoryWrapper: {
    padding: 5,
    marginBottom: 10,
  },
  categoryItemsWrapper: {
  },
  categoryItemWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 20,
    
  },
  categoryItemText: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
});

export default RecScreen;