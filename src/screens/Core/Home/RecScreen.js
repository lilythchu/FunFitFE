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

import { useNavigation, useRoute } from '@react-navigation/native';
import globalStyles from '../../../../styles/global';
import categoriesData from '../../../../assets/data/categoriesData';

import { getGenreURL } from '../../../../api/client';
import axios from 'axios';


const RecScreen = () => {
  const navigation = useNavigation();
  const {token} = useRoute().params;
  const [recData, setRecData] = useState([]);
  const [selectedId, setSelectedId] = useState('type-1');
  const [selectedGenre, setSelectedGenre] = useState('cardio');
  const [loading, setLoading] = useState(false);

  const getByGenre = (genre) => {
    setLoading(true);
    axios
      .get(getGenreURL, {
        headers: {"Authorization": `Bearer ${token}`},
        params: {genre: genre}
      })
      .then(res => {
        setLoading(false);
        setRecData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getByGenre(selectedGenre);
  }, [recData]);
  
  const CategoryList = () => {
    const renderCategoryItem = ({item}) => {
      return (
        <TouchableOpacity
          onPress={() => {
            setSelectedId(item.id);
            setSelectedGenre(item.title);
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
  
  const renderRecCard = ({item}) => {
    return (
      <RecCard item={item} navigation={navigation} />
    );
  };

  return (
    <View style={{flex: 1, padding: 20, backgroundColor: 'white'}}>
      <CategoryList />
      <FlatList
        data={recData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        renderItem={renderRecCard}
      />
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
  },
});

export default RecScreen;