import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, NativeModules, Platform } from 'react-native';
import IconFruit from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFavorite from 'react-native-vector-icons/Fontisto';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home/Home';
import Favorites from './src/screens/Favorites/Favorites';
import Fruit from './src/screens/Fruit/Fruit';

import { FruitsContext } from './src/Contexts/FruitsContext';

const { StatusBarManager } = NativeModules;

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(250, 249, 246)',
  },
};

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
      <HomeStack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'rgb(189,78,155)', borderBottomWidth: 2, borderBottomColor: 'green' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
          <HomeStack.Screen name="Fruit List" component={Home} />
          <HomeStack.Screen name="Fruit" component={Fruit} />
      </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const App = () => {
  const [fruitsList, setFruitsList] = useState();

  useEffect(() => {
    fetch('https://www.fruityvice.com/api/fruit/all')
      .then(res => {
        if (!res.ok) {
          throw new Error('Not found');
        }
        return res.json();
      })
      .then(data => {
        const newData = data.map(item => ({ ...item, favorite: 'favorite-border' }));
        setFruitsList(newData);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
      <SafeAreaView style={{ 
        flex: 1, 
        paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
      }}>
        <NavigationContainer theme={MyTheme}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                if (route.name === 'Fruits') {
                  return <IconFruit name='fruit-cherries' size={size} color={color} />;
                } else if (route.name === 'Favorites') {
                  return <IconFavorite name='favorite' size={size} color={color} />;
                }
              },
              tabBarActiveTintColor: 'rgb(189,78,155)',
              tabBarInactiveTintColor: 'gray',
              tabBarStyle: {
                backgroundColor: 'rgba(222, 104, 130, 0.1)',
                elevation: 0,
              },
              headerStyle: {
                backgroundColor: 'rgb(189,78,155)',
              },
              headerTintColor: 'white',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            })}
          >
              <Tab.Screen
                name="Fruits" 
                options={{ headerShown: false }}
              >
                {() => (
                  <FruitsContext.Provider value={{ fruitsList, setFruitsList }}>
                    <HomeStackScreen />
                  </FruitsContext.Provider>
                )}
              </Tab.Screen>
              <Tab.Screen
                name="Favorites"
              >
                {() => (
                  <FruitsContext.Provider value={{ fruitsList, setFruitsList }}>
                    <Favorites />
                  </FruitsContext.Provider>
                )}
              </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
  );
};

export default App;
