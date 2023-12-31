// VenueDetailsScreen.tsx
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, TextInput, FlatList } from 'react-native';

import { fetchVenueDetails } from './api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthContext } from './AuthContext';
import { submitReview } from './api';

type RootStackParamList = {
  VenueDetails: { venueId: number };
};

type VenueDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'VenueDetails'>;

type Venue = {
  id: number;
  name: string;
  address: string;
  description: string;
  openingHours: string;
  venueType: string;
};

type Review = {
  id: number;
  user: {
    username: string;
  };
  rating: number;
  comment: string;
};

const VenueDetailsScreen: React.FC<VenueDetailsScreenProps> = ({ route }) => {
  const { venueId } = route.params;
  const [venue, setVenue] = useState<Venue | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userReview, setUserReview] = useState({ rating: 0, comment: '' });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchVenueDetails(venueId)
      .then((fetchedData) => {
        setVenue(fetchedData.venue);
        setReviews(fetchedData.reviews);
      })
      .catch(error => console.error(error));
  }, [venueId]);

  if (!venue) {
    return <ActivityIndicator size="large" />;
  }

  const handleReviewSubmit = async () => {
    try {
      // Validate the review input (rating should be between 1 and 5)
      if (userReview.rating < 1 || userReview.rating > 5) {
        console.error('Invalid rating. Rating must be between 1 and 5.');
        return;
      }
  
      // Make API call to create a new review
      const newReview = await submitReview(venueId, userReview.rating, userReview.comment, user.token);
  
      // Update the local state to include the new review
      setReviews([...reviews, newReview]);
  
      // Clear the user review input
      setUserReview({ rating: 0, comment: '' });
  
      console.log('Review submitted successfully:', newReview);
    } catch (error) {
      // Handle error (show an alert, etc.)
    }
  };

  console.log('Rendering Venue:', venue);

  return (
    <View style={styles.container}>
      {/* Venue Details Section */}
      <View style={styles.venueDetails}>
        <Text style={styles.title}>{venue.name}</Text>
        <Text style={styles.address}>{venue.address}</Text>
        <Text style={styles.venue}>{venue.description}</Text>
        <Text style={styles.venue}>Opening Times: {venue.openingHours}</Text>
        <Text style={styles.venue}>Type: {venue.venueType}</Text>
      </View>

      {/* Reviews Section */}
      <View style={styles.reviewSection}>
        <Text style={styles.reviewTitle}>Reviews</Text>
        <View style={{ height: 200 }}>
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.reviewItem}>
                <Text style={styles.reviewUsername}>{item.user.username}</Text>
                <Text style={styles.reviewRating}>Rating: {item.rating}</Text>
                <Text style={styles.reviewComment}>{item.comment}</Text>
              </View>
            )}
          />
        </View>
      </View>

       {/* Submit Review Section */}
       {user ? (
        <View style={styles.userReviewSection}>
          <Text style={styles.reviewTitle}>Your Review</Text>
          <View style={styles.reviewInputContainer}>
            <Text style={styles.reviewInputLabel}>Rating</Text>
            <TextInput
              style={styles.reviewInput}
              placeholder="Rating (1-5)"
              keyboardType="numeric"
              onChangeText={(text) => setUserReview({ ...userReview, rating: parseInt(text) })}
            />
          </View>
          <View style={styles.reviewInputContainer}>
            <Text style={styles.reviewInputLabel}>Comment</Text>
            <TextInput
              style={styles.reviewInput}
              placeholder="Comment"
              multiline
              onChangeText={(text) => setUserReview({ ...userReview, comment: text })}
            />
          </View>
          <Button title="Submit Review" onPress={handleReviewSubmit} />
        </View>
      ) : (
        <Text style={styles.loginPrompt}>Log in to leave a review</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    color: 'black',
  },
  venueDetails: {
    marginBottom: 16,
    color: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  address: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
  },
  venue: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
  },
  reviewSection: {
    marginBottom: 16,
    color: 'black',
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  reviewItem: {
    marginBottom: 16,
    color: 'black',
  },
  reviewUsername: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  reviewRating: {
    fontSize: 14,
    color: 'black',
  },
  reviewComment: {
    fontSize: 14,
    color: 'black',
  },

  loginPrompt: {
    marginTop: 16,
    fontSize: 16,
    color: 'black',
  },

  userReviewSection: {
    marginBottom: 16,
    color: 'black',
  },
  reviewInputContainer: {
    marginBottom: 8,
  },
  reviewInputLabel: {
    fontSize: 16,
    marginBottom: 4,
    color: 'black',
  },
  reviewInput: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
  },
});

export default VenueDetailsScreen;
