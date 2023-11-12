import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

const Home = () => {
    const [fruits, setFruits] = useState();
    const [timesPressed, setTimesPressed] = useState(0);

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

    const onPressFunction = () => {
        setTimesPressed(current => current + 1);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
          <FlatList
            data={fruits}
            renderItem={({item}) => {
                return (
                    <Pressable 
                        onPress={onPressFunction}
                        style={({pressed}) => [
                            {
                                backgroundColor: pressed ? 'rgba(111,35,177,0.4)' : 'rgba(111,35,177,0.8)',
                            },
                            styles.wrapperCustom,
                        ]}
                    >
                        <Text style={styles.text}>{item.name}</Text>
                    </Pressable>
                )
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
          />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 6,
        marginBottom: 6,
        minWidth: 200,
    },
  });  

export default Home;