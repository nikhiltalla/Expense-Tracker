import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { commonStyles } from '../styles';

export default function SignupScreen({ navigation, users, setUsers }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // Step 1: Add email state

  const handleSignup = () => {
    if (users.some(user => user.username === username)) {
      alert('Username already exists. Please choose another username.');
      return;
    }
    // You might also want to check if the email already exists among users
    if (users.some(user => user.email === email)) {
      alert('Email already exists. Please choose another email.');
      return;
    }

    const newUser = { username, password, email }; // Include email in the newUser object
    setUsers([...users, newUser]);
    alert('Signup successful! Please log in to continue.');
    navigation.navigate('Welcome');
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.header}>Sign Up</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Email" // Step 2: Add email TextInput
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address" // Set the keyboard type for email input
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
}
