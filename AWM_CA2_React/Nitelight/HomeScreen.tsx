import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Button, Modal,Image, Text, TextInput, TouchableOpacity} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Geolocation from '@react-native-community/geolocation';
import { getVenues } from './api'; 
import { AuthContext } from './AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Coordinates = {
  latitude: number;
  longitude: number;
};


// Function to calculate distance using Haversine formula
function haversine(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(coord2.latitude - coord1.latitude);
  const dLon = deg2rad(coord2.longitude - coord1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.latitude)) *
      Math.cos(deg2rad(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

// Helper function to convert degrees to radians
function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

type RootStackParamList = {
  Home: undefined;
  VenueDetails: { venueId: number };
  Login: undefined;
  Profile: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
   // State variables
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [filterType, setFilterType] = useState('All'); // Default to show all
  const [allVenues, setAllVenues] = useState<any[]>([]); // Stores all venues
  const [filteredVenues, setFilteredVenues] = useState<any[]>([]); // Stores filtered venues
  const { user } = useContext(AuthContext);
  const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
  const [distanceFilter, setDistanceFilter] = useState(''); // State to store the distance filter

   // Initial region for the map
  const initialRegion = {
    latitude: 53.3458, 
    longitude: -6.2631, 
    latitudeDelta: 0.0922, 
    longitudeDelta: 0.0421,
  };
  
  useEffect(() => {
    getVenues().then((data) => {
      if (data) {
        setAllVenues(data);
        setFilteredVenues(data);
      }
    });

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  // Function to apply venue type filter
  const applyFilter = (type: string) => {
    if (type === 'All') {
      setFilteredVenues(allVenues);
    } else {
      const filtered = allVenues.filter((venue) => venue.venueType === type);
      setFilteredVenues(filtered);
    }
    setFilterType(type);
    setFilterModalVisible(false); // Close the filter modal after applying the filter
  };

  // Function to apply location filter
  const applyLocationFilter = () => {

    const userCoordinates: Coordinates = { latitude: userLocation.latitude, longitude: userLocation.longitude };

    // Filter venues based on the user-specified distance
    const filtered = allVenues.filter((venue) => {
      const venueCoordinates: Coordinates = venue.location;
      const venueDistance = haversine(userCoordinates, venueCoordinates);
      return venueDistance <= parseFloat(distanceFilter);
    });

    setFilteredVenues(filtered);
    setFilterModalVisible(false); // Close the filter modal after applying the filter
  };

  return (
    <View style={styles.container}>
      <MapView
  style={styles.map}
  showsUserLocation={true}
  initialRegion={initialRegion}
>
  {filteredVenues.map((venue) => (
    <Marker
      key={venue.id}
      coordinate={{ latitude: venue.location.latitude, longitude: venue.location.longitude }}
      title={venue.name ? venue.name : "Untitled Venue"}
    >
      <Callout onPress={() => {
        console.log('Venue Name:', venue.name);
        navigation.navigate('VenueDetails', { venueId: venue.id });
      }}>
        <Text style={{ color: 'black' }}>{venue.name}</Text>
      </Callout>
    </Marker>
  ))}
</MapView>
      <View style={styles.toolbar}>
        {user ? (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Profile')}
              >
                <Image source={require('./assets/Icons/profile.png')} style={styles.icon} />
                <Text style={styles.buttonText}>Profile</Text>
              </TouchableOpacity>
  
              <TouchableOpacity
                style={styles.button}
                onPress={() => setFilterModalVisible(true)}
              >
                <Image source={require('./assets/Icons/Filter.png')} style={styles.icon} />
                <Text style={styles.buttonText}>Filter</Text>
              </TouchableOpacity>
            </>
        ) : (
           // Login button for non-logged-in users
          <Button title="Login" onPress={() => navigation.navigate('Login')} />
        )}
      </View>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => {
          setFilterModalVisible(!isFilterModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text>Filter by Venue Type:</Text>
          {['All', 'Restaurant', 'Bar', 'Nightclub'].map((filterType) => (
            <TouchableOpacity
              key={filterType}
              style={styles.filterButton}
              onPress={() => applyFilter(filterType)}
            >
              <Text style={styles.filterButtonText}>{filterType}</Text>
            </TouchableOpacity>
          ))}

          <Text style={{ color: 'black', marginTop: 10 }}>Filter by Distance:</Text>
          <TextInput
            style={styles.filterInput}
            placeholder="Enter distance (in km)"
            keyboardType="numeric"
            onChangeText={(text) => setDistanceFilter(text)}
          />
          <TouchableOpacity
            style={styles.applyFilterButton}
            onPress={applyLocationFilter}
          >
            <Text style={styles.applyFilterButtonText}>Apply Location Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setFilterModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  map: {
    flex: 1,
  },

  calloutText: {
    fontWeight: 'bold',
  },
  modalView: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },

  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },

  // Style for the buttons
  button: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  buttonText: {
    fontSize: 12,
    color: '#9E9E9E',
    backgroundColor: 'transparent',
  },

   filterButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  filterButtonText: {
    color: 'white',
  },

  // Style adjustments for filter input
  filterInput: {
    color: 'black',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
  },

  // Style adjustments for apply filter button
  applyFilterButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  applyFilterButtonText: {
    color: 'white',
  },

  // Style adjustments for close button
  closeButton: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'black',
  },
});

export default HomeScreen;