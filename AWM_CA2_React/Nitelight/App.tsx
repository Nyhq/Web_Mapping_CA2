import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './AuthContext';
import HomeScreen from './HomeScreen';
import VenueDetailsScreen from './VenueDetailsScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ProfileScreen from './ProfileScreen';

// Define the navigation stack parameters
type RootStackParamList = {
  Home: undefined;
  VenueDetails: { venueId: number };
  Login: undefined;
  Register: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    // Wrap the entire app with the AuthProvider for managing user authentication
    <AuthProvider>
      {/* NavigationContainer is the root component for navigation */}
      <NavigationContainer>
        {/* Stack.Navigator manages the navigation stack */}
        <Stack.Navigator>
          {/* Each Stack.Screen represents a screen in the app */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="VenueDetails" component={VenueDetailsScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
