import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import IconFav from 'react-native-vector-icons/MaterialIcons';
import { FruitsContext } from "../../Contexts/FruitsContext";
import FruitList from "../../components/FruitList/FruitList";

const Home = () => {
    const { fruitsList , setFruitsList } = useContext(FruitsContext);

    const onFavoritePress = (item) => {
        setFruitsList(prevFruits => prevFruits.map(fruit => 
            (fruit.id === item.id) ? {...fruit, favorite: (fruit.favorite === 'favorite') ? 'favorite-border' : 'favorite'} : fruit
        ));
     };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
          <FruitList onFavoritePress={onFavoritePress} fruitsList={fruitsList} location='Home'/>
        </View>
    );
};

export default Home;