import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, NativeModules, Platform } from 'react-native';
import IconFruit from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFavorite from 'react-native-vector-icons/Fontisto';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './src/screens/Home';
import Favorites from './src/screens/Favorites';
import Fruit from './src/screens/Fruit';

const { StatusBarManager } = NativeModules;

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgba(222, 104, 130, 0.05)',
  },
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ 
      flex: 1, 
      paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
    }}>
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator
           screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              if (route.name === 'Fruits List') {
                return <IconFruit name='fruit-cherries' size={size} color={color} />;
              } else if (route.name === 'Favorites') {
                return <IconFavorite name='favorite' size={size} color={color} />;
              }
            },
            tabBarActiveTintColor: 'rgb(111,35,177)',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: 'rgba(222, 104, 130, 0.1)',
              elevation: 0,
            },
            headerStyle: {
              backgroundColor: 'rgba(222, 104, 130, 0.2)',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen 
            name="Fruits List" 
            component={Home}
          />
          <Tab.Screen 
            name="Favorites" 
            component={Favorites} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
