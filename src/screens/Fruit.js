import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Table, Row, Rows } from 'react-native-table-component';

const Fruit = ({ route }) => {
    const { item } = route.params;
    const [fruit, setFruit] = useState();

    useEffect(() => {
        fetch(`https://www.fruityvice.com/api/fruit/${item.id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Not found');
                }
                return res.json()
            })
            .then(data => {
                setFruit(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [item]);

    let id, fruitWithoutId;
    let tableData;
    let tableNutritions;
    {fruit ? (
        { id, ...fruitWithoutId } = fruit,
        tableData = {
            tableHead: Object.keys(fruitWithoutId).slice(0, 4),
            tableData: [Object.values(fruitWithoutId).slice(0, 4)],
        },
        tableNutritions = {
            tableHead: Object.keys(fruit.nutritions),
            tableData: [Object.values(fruit.nutritions)],
        }
    ) : 
    ''
    }

    return (
        <>
            {
                fruit ? (
                    <View style={styles.container}>
                        <Table style={{ marginBottom: 30 }} borderStyle={{ borderWidth: 3, borderColor: 'rgb(111,35,177)' }}>
                            <Row data={tableData.tableHead} style={styles.head} textStyle={styles.headText} />
                            <Rows data={tableData.tableData} textStyle={styles.text} />
                        </Table>
                        <Table borderStyle={{ borderWidth: 3, borderColor: 'rgb(111,35,177)' }}>
                            <Row data={tableNutritions.tableHead} style={styles.head} textStyle={styles.headText} />
                            <Rows data={tableNutritions.tableData} textStyle={styles.text} />
                        </Table>
                    </View>
                ) :
                <Text>Loading</Text>
            }
        </>
    )

};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, justifyContent: 'center', },
    head: { height: 44, backgroundColor: 'rgba(111,35,177,0.4)' },
    headText: { fontSize: 12, padding: 5, fontWeight: 'bold' , textAlign: 'center', color: 'white' },
    text: { margin: 6, fontSize: 10, fontWeight: 'bold' , textAlign: 'center' },
});

export default Fruit;