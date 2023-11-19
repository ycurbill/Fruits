import { View } from "react-native";
import FruitList from "../../components/FruitList/FruitList";

import { selectAllFruits } from "../../Redux/fruitListSlice";
import { useSelector } from "react-redux";

const Favorites = () => {
    const fruitList = useSelector(selectAllFruits);
  
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
          <FruitList fruitList={fruitList} location='Favorites' />
        </View>
    );
}
export default Favorites;
