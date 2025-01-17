import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'; 
import AddExpenseScreen from './screens/AddExpenseScreen'; 
import SignupScreen from './screens/SignupScreen'; 
import LoginScreen from './screens/LoginScreen'; 
import WelcomeScreen from './screens/WelcomeScreen'; 
import ForgotPasswordScreen from './screens/ForgotPasswordScreen'; 

const Stack = createNativeStackNavigator();

export default function App() {
  const [users, setUsers] = useState([]); // Initialize users as an empty array
  const [currentUser, setCurrentUser] = useState(null); // For the currently logged in user
  const [expenses, setExpenses] = useState({}); // For storing users' expenses
  const handleDeleteExpenseForUser = (username, expenseId) => {
  setExpenses(prevExpenses => {
    const userExpenses = prevExpenses[username] || [];
    const filteredExpenses = userExpenses.filter(expense => expense.id !== expenseId);
    return {
      ...prevExpenses,
      [username]: filteredExpenses,
    };
  });
};

  // Helper function to add expenses for a specific user
  const handleAddExpenseForUser = (username, expense) => {
    setExpenses(prevExpenses => {
      const userExpenses = prevExpenses[username] || [];
      return {
        ...prevExpenses,
        [username]: [...userExpenses, expense],
      };
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          options={{ headerShown: false }}
        >
          {props => <SignupScreen {...props} users={users} setUsers={setUsers} />}
        </Stack.Screen>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
        >
          {props => <LoginScreen {...props} users={users} setCurrentUser={setCurrentUser} />}
        </Stack.Screen>
        <Stack.Screen
  name="Home"
  options={{ headerShown: false }}
>
  {props => (
    <HomeScreen
      {...props}
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      expenses={expenses[currentUser?.username] || []}
      setExpenses={setExpenses} 
      deleteExpenseForUser={handleDeleteExpenseForUser} 
    />
  )}
</Stack.Screen>
<Stack.Screen
          name="ForgotPassword"
          options={{ headerShown: false }}
        >
          {props => <ForgotPasswordScreen {...props} users={users} />}
        </Stack.Screen>
        <Stack.Screen
          name="Add Expense"
          options={{ headerShown: false }}
        >
          {props => <AddExpenseScreen {...props} addExpenseForUser={handleAddExpenseForUser} currentUser={currentUser} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
