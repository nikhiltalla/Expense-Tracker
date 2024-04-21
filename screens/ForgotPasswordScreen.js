import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { commonStyles } from '../styles';

export default function ForgotPasswordScreen({ users }) {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    const user = users.find(u => u.email === email);
    if (user) {
      alert('An email has been sent with instructions to reset your password.');
    } else {
      alert('This email is not registered.');
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.header}>Reset Password</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Enter your email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
      />
      <Button title="Send Reset Link" onPress={handleResetPassword} />
    </View>
  );
}
