import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos !== null) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Error loading todos', error);
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos', error);
    }
  };

  const addTodo = () => {
    if (text.trim() !== '') {
      if (editingId !== null) {
      
        const updatedTodos = todos.map((todo) =>
          todo.id === editingId ? { ...todo, text } : todo
        );
        setTodos(updatedTodos);
        setEditingId(null);
      } else {
        
        setTodos([...todos, { id: Date.now(), text }]);
      }
      setText('');
    }
  };

  const editTodo = (id, initialText) => {
    setEditingId(id);
    setText(initialText);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    setEditingId(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a todo"
        value={text}
        onChangeText={(value) => setText(value)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.circularButton]}
          onPress={addTodo}
        >
          <Text style={styles.buttonText}>{editingId !== null ? 'Update Todo' : 'Add Todo'}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.todoItem, { backgroundColor: '#bcbcbc' }]}>
            <Text style={styles.todoText}>{item.text}</Text>
            <View style={styles.buttonContainer}>
              
              <TouchableOpacity
                style={[styles.circularButton, { backgroundColor: '#6fa8dc' }]}
                onPress={() => editTodo(item.id, item.text)}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.circularButton, { backgroundColor: '#8e7cc3' }]}
                onPress={() => deleteTodo(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#eeeeee',
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: '#2986cc',
    borderWidth: 1,
    marginBottom: 8,
    paddingLeft: 8,
    backgroundColor: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 8,
    borderRadius: 8,
  },
  todoText: {
    flex: 1,
    marginRight: 8,
    color: '#333333',
  },
  button: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ea9999', 
  },
  circularButton: {
    borderRadius: 5, 
    padding: 5,
  },
  buttonText: {
    color: '#ffffff', 
    textAlign: 'center',
  },
});

export default TodoApp;
