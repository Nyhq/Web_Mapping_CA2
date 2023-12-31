import axios from 'axios';

const API_URL = 'https://seanbreen.eu/api/';

// Helper function to parse location string and extract latitude and longitude
const parseLocation = (locationStr) => {
    const pointRegex = /POINT \(([^ ]+) ([^ ]+)\)/;
    const match = locationStr.match(pointRegex);
    if (match && match.length === 3) {
        const longitude = parseFloat(match[1]);
        const latitude = parseFloat(match[2]);
        return { latitude, longitude };
    }
    return { latitude: 0, longitude: 0 };
};

/**
 * Fetches a list of venues from the API.
 */
export const getVenues = async () => {
    try {
        console.log('Fetching venues...');
        const response = await axios.get(`${API_URL}venues/`);
        const data = response.data.map(venue => ({
            ...venue,
            location: parseLocation(venue.location),
        }));
        console.log('Data received:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

/**
 * Fetches details of a specific venue from the API.
 */

export const fetchVenueDetails = async (venueId) => {
    const url = `${API_URL}venues/${venueId}/`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching venue details:', error);
        return null;
    }
};

/**
 * Registers a new user.
 */

export const registerUser = async (username, password) => {
    try {
        const response = await axios.post(`https://seanbreen.eu/register/`, { username, password });
        return response.data;
    } catch (error) {
        console.error('Registration error:', error.response.data);
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`https://seanbreen.eu/login/`, { username, password });
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response.data);
    }
};

export const submitReview = async (venueId, rating, comment, token) => {
    console.log('Submitting review:', { venueId, rating, comment, token });

    try {
      const response = await axios.post(
        `${API_URL}submit_review/`, 
        { venue: venueId, rating, comment },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log('Review submission response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error submitting review:', error.response.data);
      throw error;
    }
  };
