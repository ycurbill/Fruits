import { View, Text } from "react-native";
import { FruitsContext } from "../../Contexts/FruitsContext";
import { useContext } from "react";
import FruitList from "../../components/FruitList/FruitList";

const Favorites = () => {
    const { fruitsList , setFruitsList } = useContext(FruitsContext);
  
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
          <FruitList fruitsList={fruitsList} location='Favorites' />
        </View>
    );
}
export default Favorites;