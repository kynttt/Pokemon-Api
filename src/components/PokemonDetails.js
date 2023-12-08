import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const PokemonDetails = ({ route, navigation }) => {
    const { name } = route.params;
    const [pokemonData, setPokemonData] = useState(null);
  
    useEffect(() => {
      const fetchPokemonData = async () => {
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
          setPokemonData(response.data);
        } catch (error) {
          console.error(`Error fetching data for ${name}:`, error);
        }
      };
  
      fetchPokemonData();
    }, [name]);
  
    const handleGoBack = () => {
      navigation.goBack();
    };
  
    return (
      <View style={styles.container}>
        {pokemonData && (
          <React.Fragment>
            
            <Text style={styles.header}> {pokemonData.name}</Text>
            <View style={styles.glassmorphismContainer}>
              <Image
                source={{ uri: pokemonData.sprites.other['official-artwork'].front_default }}
                style={styles.pokemonImage}
              />
            </View>
            <Text style={styles.header}>ID: {pokemonData.id}</Text>
            <Text style={styles.sectionTitle}>Stats:</Text>
            {pokemonData.stats.map((stat) => (
              <View key={stat.stat.name} style={styles.statContainer}>
                <Text style={styles.statName}>{stat.stat.name}</Text>
                <View style={[styles.statBar, { width: (stat.base_stat / 255) * 200 }]} />
                <Text style={styles.statValue}>{stat.base_stat}</Text>
              </View>
            ))}
            <Button title="Go Back" onPress={handleGoBack} color="#bcbcbc"/>
          </React.Fragment>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#121212', 
      flex: 1,
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#ffffff', 
    },
    glassmorphismContainer: {
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.1)', 
      borderRadius: 16, 
      padding: 16, 
      marginBottom: 16, 
    },
    pokemonImage: {
      width: 300,
      height: 300,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 16,
      marginBottom: 8,
      color: '#ffffff', 
    },
    statContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      backgroundColor: '#1f1f1f', 
      padding: 8, 
      borderRadius: 8, 
    },
    statName: {
      marginRight: 8,
      flex: 1,
      color: '#ffffff', 
    },
    statBar: {
      height: 20,
      backgroundColor: '#eeeeee',
      borderRadius: 5,
    },
    statValue: {
      marginLeft: 8,
      width: 40,
      color: '#ffffff', 
    },
    button: {
        backgroundColor: '#bcbcbc', 
      }
  });
  
  export default PokemonDetails;
  