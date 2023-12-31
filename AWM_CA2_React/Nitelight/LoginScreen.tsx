import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { loginUser } from './api';
import { AxiosError } from 'axios';
import { AuthContext } from './AuthContext';

type RootStackParamList = {
  Home: undefined;
  VenueDetails: { venueId: number };
  Login: undefined;
  Register: undefined;
};

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, password);
      console.log('Login Response:', response);
      console.log('Token:', response && response.token);
      if (response && response.token) {
        setUser({ username: username, token: response.token });
        Alert.alert("Login Successful", "You are now logged in.");
        navigation.navigate('Home');
      } else {
        // Handle case where login is unsuccessful
        Alert.alert("Login Failed", "Invalid username or password.");
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        Alert.alert(`Login failed: ${axiosError.response.data}`);
      } else {
        Alert.alert(`Login failed: ${axiosError.message}`);
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

      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4, 
    borderColor: '#ccc', 
    color: 'black',
  },
  title: {
    color: 'black',
    marginBottom: 6,
  },
  registerText: {
    marginTop: 15,
    color: 'blue',
    textAlign: 'center',
  },
});

export default LoginScreen;