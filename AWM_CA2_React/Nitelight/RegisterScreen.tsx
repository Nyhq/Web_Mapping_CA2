import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { registerUser } from './api';
import { AxiosError } from 'axios';
import axios from 'axios';

type RootStackParamList = {
  Home: undefined;
  VenueDetails: { venueId: number };
  Login: undefined;
  Register: undefined;
};

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isValidPassword = (password: string): boolean => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match.");
      return;
    }
    if (!isValidPassword(password)) {
      Alert.alert("Password must be 8 characters long, include a number and a special character.");
      return;
    }
    try {
      const response = await registerUser(username, password);
      if (response && response.success) {
        // Registration successful
        Alert.alert("Registration Successful", "Please log in with your new credentials.");
        navigation.navigate('Login'); // Navigate to the login screen
      } else {
        // Handle registration failure
        Alert.alert("Registration Failed", "Please try again.");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Now we're sure error.response exists
        Alert.alert(`Registration failed: ${error.response.data}`);
      } else {
        // Handle the case where error.response does not exist
        Alert.alert("Registration failed: An unexpected error occurred.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Username</Text>
      <TextInput
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <Text style={styles.title}>Password</Text>
      <TextInput
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Text style={styles.title}>Confirm Password</Text>
      <TextInput
        placeholder="Confirm your password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    color: 'black',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  title: {
    color: 'black',
    marginBottom: 6,
  },
});

export default RegisterScreen;