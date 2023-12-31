// ProfileScreen.tsx

import React, { useContext } from 'react';
import { View, Text, StyleSheet,TouchableOpacity  } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthContext } from './AuthContext';

type RootStackParamList = {
    Home: undefined;
    VenueDetails: { venueId: number };
    Login: undefined;
    Profile: undefined;
  };
  
type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;


const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null);
    navigation.navigate('Home'); 
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.username}>Username: {user ? user.username : 'Not logged in'}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  username: {
    fontSize: 16,
    marginBottom: 20,
    color: 'black',
  },
  logoutButton: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    fontWeight: 'bold',
  },
  logoutButtonText: {
    color: 'black',
    textAlign: 'center',
  },
});

export default ProfileScreen;