import axios from 'axios';
import { Profile } from '../types/profile';

const getProfileByUsername = async (username:string): Promise<Profile> => {
  try {

   
    const response = await axios.get(`https://api.myklan.africa/public/api/profile/${username}`);

   
    if (response.status === 200 && response.data) {
      const user: Profile = response.data
      return user;
    } else {
      throw new Error('Failed to fetch user details');
    }
  } catch (err) {
    console.error(err);
    throw new Error('Failed to fetch user details');
  }
};

export default getProfileByUsername;
