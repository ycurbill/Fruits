import { Pressable } from "react-native";
import { View, Text } from "react-native";
import IconFav from 'react-native-vector-icons/MaterialIcons';
import styles from './styles.FruitItem';

const FruitItem = ({ onPressFunction, onFavoritePress, item, location }) => {
    return (
        <Pressable 
            onPress={() => onPressFunction(item)}
            style={({pressed}) => [
                {
                    backgroundColor: pressed ? 'rgba(111,35,177,0.4)' : 'rgba(111,35,177,0.8)',
                },
                styles.card,
            ]}
        >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.text}>{item.name}</Text>
                {location === 'Home' ? (
                    <IconFav 
                        name={item.favorite} 
                        size={25}
                        color='white'
                        onPress={() => onFavoritePress(item)}
                    /> 
                ) :
                    null
                }
            </View>
        </Pressable>
    )
};

export default FruitItem;