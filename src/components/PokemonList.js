import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

const PokemonList = ({ navigation }) => {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
      setPokemons(response.data.results);
    } catch (error) {
      console.error('Error fetching pokemons', error);
    }
  };

  const fetchPokemonDetails = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching pokemon details', error);
      return null;
    }
  };

  const handlePokemonPress = async (pokemon) => {
    const details = await fetchPokemonDetails(pokemon.url);
    if (details) {
      navigation.navigate('PokemonDetails', {
        name: pokemon.name,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`,
        stats: details.stats,
      });
    }
  };

  const renderPokemonItem = ({ item }) => (
    <TouchableOpacity style={styles.pokemonItem} onPress={() => handlePokemonPress(item)}>
      <Image
        source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/')[6]}.png` }}
        style={styles.pokemonImage}
      />
      <Text style={styles.pokemonName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Pokémon"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredPokemons}
        keyExtractor={(item) => item.name}
        renderItem={renderPokemonItem}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212', 
  },
  searchBar: {
    height: 40,
    borderColor: '#ffffff', 
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    padding: 8,
    color: '#ffffff', 
  },
  pokemonItem: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#333333', 
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
  pokemonName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff', 
  },
});

export default PokemonList;
