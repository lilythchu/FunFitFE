import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View, FlatList} from 'react-native';
import categoriesData from '../../../assets/data/categoriesData';

const CategoryList = ({setSelectedId, selectedId, getByGenre}) => {
  const renderCategoryItem = ({item}) => (
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
            color: item.id === selectedId ? 'orange' : 'gray',
          },
        ]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.categoryWrapper}>
      <View style={styles.categoryItemsWrapper}>
        <FlatList
          data={categoriesData}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          extraData={selectedId}
        />
      </View>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  categoryWrapper: {
    padding: 5,
    marginBottom: 10,
  },
  categoryItemsWrapper: {},
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
