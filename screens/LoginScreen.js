import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { commonStyles } from '../styles';

export default function LoginScreen({ navigation, users, setCurrentUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      navigation.navigate('Home');
    } else {
      alert('Invalid username or password.');
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.header}>Login</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.buttonText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Or 'flex-end' if you want them to be aligned to the right
    padding: 10,
  },
  button: {
    // Style for your button
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue', // Replace with your desired color
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    // Style for your button text
    color: 'white',
    textAlign: 'center',
  },
  // ... other styles ...
});


