import { View } from "react-native";
import FruitList from "../../components/FruitList/FruitList";

import { selectAllFruits, toggleFavorite } from "../../Redux/fruitListSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
    const fruitList = useSelector(state => selectAllFruits(state));
    const dispatch = useDispatch();

    const onFavoritePress = (item) => {
        dispatch(toggleFavorite(item));
     };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
          <FruitList onFavoritePress={onFavoritePress} fruitList={fruitList} location='Home'/>
        </View>
    );
};

export default Home;