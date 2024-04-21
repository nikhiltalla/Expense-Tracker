import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { commonStyles } from '../styles';

export default function AddExpenseScreen({ navigation, addExpenseForUser, currentUser }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddExpense = () => {
    if (!description || !amount) {
      alert('Please fill in all fields.');
      return;
    }
    const newExpense = {
      id: new Date().getTime(),
      description,
      amount: parseFloat(amount),
    };
    addExpenseForUser(currentUser.username, newExpense);
    navigation.goBack();
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.header}>Add New Expense</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Description"
        onChangeText={setDescription}
        value={description}
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Amount"
        keyboardType="numeric"
        onChangeText={setAmount}
        value={amount}
      />
      <Button title="Add Expense" onPress={handleAddExpense} />
    </View>
  );
}
