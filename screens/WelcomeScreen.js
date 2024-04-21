import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { commonStyles } from '../styles'; // Make sure to adjust the path as necessary

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={commonStyles.container}>
      <Image
        source={require('../logo.png')} // Replace with actual path to your local image
        style={styles.logo}
      />
      <Text style={[commonStyles.header, styles.welcomeText]}>Welcome to Expense Tracker!</Text>
      <TouchableOpacity
        style={commonStyles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={commonStyles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={commonStyles.button}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={commonStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    marginBottom: 40,
    textAlign: 'center',
  },
});
