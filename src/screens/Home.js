import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";

const Home = () => {
    const [fruits, setFruits] = useState();

    useEffect(() => {
        fetch('https://www.fruityvice.com/api/fruit/all')
            .then(res => res.json())
            .then(data => {
                setFruits(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <FlatList
            data={fruits}
            renderItem={({item}) => <Text>{item.name}</Text>}
            keyExtractor={item => item.id}
          />
        </View>
    );
}
export default Home;