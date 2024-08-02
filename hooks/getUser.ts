import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUserDetails = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get('https://api.myklan.africa/public/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.status) {
      const user = response.data.data[0];
      await AsyncStorage.setItem('user', JSON.stringify(user));
      return user;
    } else {
      throw new Error('Failed to fetch user details');
    }
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch user details');
  }
};

export default getUserDetails;
