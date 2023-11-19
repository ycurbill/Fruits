import React from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FruitItem from '../FruitItem/FruitItem';

const FruitList = ({ onFavoritePress, fruitList, location }) => {
    const navigation = useNavigation();

    const onPressFunction = (item) => {
        navigation.navigate('Fruit', { item: item });
    };

   return (
       <FlatList
           data={fruitList}
           renderItem={({item}) => {
               return (
                    (location === 'Favorites') ? (
                        (item.favorite === 'favorite') ? (
                            <FruitItem onPressFunction={onPressFunction} onFavoritePress={onFavoritePress} item={item} location={location} />
                        ) : null
                    ) : (
                        <FruitItem onPressFunction={onPressFunction} onFavoritePress={onFavoritePress} item={item} location={location} />
                    )
               )
           }}
           showsVerticalScrollIndicator={false}
           keyExtractor={item => item.id}
       />
   );
};

export default FruitList;