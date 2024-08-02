import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';
import { User } from '../../types/user';
import getUserDetails from '../../hooks/getUser';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const EditProfile = () => {
  const router = useRouter()
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [story, setStory] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails();
        setUser(userDetails);
        setName(userDetails.name);
        setUsername(userDetails.username);
        setStory(userDetails.story);
        setAddress(userDetails.address);
        setCity(userDetails.city);
  
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUserDetails();
  }, []);

  const updateUser = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        throw new Error('No auth token found');
      }
      const updatedUser = {
        name,
        username,
        story,
        address, // Include address here
        city,
      };
  
      await axios.put(`https://api.myklan.africa/public/api/user/${user?.id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      Alert.alert("Success", "Your profile has been updated.", [
        { text: 'OK', onPress: () => router.push('/home') }
      ]);
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  };
  

  return (
    <ScrollView style={tw`flex-1 bg-black p-4`}>
      <View style={tw`mb-4`}>
        <Text style={tw`text-white mb-2`}>Name</Text>
        <TextInput
          style={tw`bg-gray-800 text-white p-2 rounded-md`}
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={tw`mb-4`}>
        <Text style={tw`text-white mb-2`}>Username</Text>
        <TextInput
          style={tw`bg-gray-800 text-white p-2 rounded-md`}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={tw`mb-4`}>
        <Text style={tw`text-white mb-2`}>About</Text>
        <TextInput
          style={tw`bg-gray-800 text-white p-2 rounded-md`}
          value={story}
          onChangeText={setStory}
        />
      </View>
      <View style={tw`mb-4`}>
        <Text style={tw`text-white mb-2`}>Address</Text>
        <TextInput
          style={tw`bg-gray-800 text-white p-2 rounded-md`}
          value={address}
          onChangeText={setAddress}
        />
      </View>
      <View style={tw`mb-4`}>
        <Text style={tw`text-white mb-2`}>Location</Text>
        <TextInput
          style={tw`bg-gray-800 text-white p-2 rounded-md`}
          value={city}
          onChangeText={setCity}
        />
      </View>
      {error ? (
        <Text style={tw`text-red-500 mb-4`}>{error}</Text>
      ) : null}
      <Pressable
        style={tw`bg-yellow-500 py-2 px-4 rounded-md mt-4`}
        onPress={updateUser}
      >
        <Text style={tw`text-black text-center text-lg font-medium`}>Save Changes</Text>
      </Pressable>
    </ScrollView>
  );
};

export default EditProfile;
