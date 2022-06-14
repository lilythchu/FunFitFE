import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RecCard from '../../../components/RecCard';
import discoverData from '../../../../assets/data/discoverData';
import {windowWidth} from '../../../../utils/Dimensions';
import { globalStyles } from '../../../../styles/global';
import categoriesData from '../../../../assets/data/categoriesData';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from '../../../components/CustomButton';

const CategoryList = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderCategoryItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedId(item.id)}
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

const RecScreen = () => {
  const navigation = useNavigation();
  const {recData} = useRoute().params;
  
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