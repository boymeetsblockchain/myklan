import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Profile } from '../types/profile';

const getProfile = async (): Promise<Profile> => {
  try {

    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get('https://api.myklan.africa/public/api/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

   
    if (response.status === 200 && response.data) {
      const user: Profile = response.data
      await AsyncStorage.setItem('profile', JSON.stringify(user)); 
      return user;
    } else {
      throw new Error('Failed to fetch user details');
    }
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch user details');
  }
};

export default getProfile;
