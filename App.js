import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PokemonList from './src/components/PokemonList';
import PokemonDetails from './src/components/PokemonDetails';
import TodoApp from './src/components/TodoApp';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainScreen = () => (
  <Tab.Navigator>
    <Tab.Screen name="PokemonList" component={PokemonList} />
    <Tab.Screen name="TodoApp" component={TodoApp} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="PokemonDetails" component={PokemonDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
