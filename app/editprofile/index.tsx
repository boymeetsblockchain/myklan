import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, Image, Button } from 'react-native';
import tw from 'twrnc';
import { User } from '../../types/user';
import getUserDetails from '../../hooks/getUser';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [story, setStory] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
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
        setAvatarUri(userDetails.avatarUri || null); 
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUserDetails();
  }, []);

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const uploadAvatar = async () => {
    if (!avatarUri) {
      Alert.alert('No Avatar', 'Please select an avatar to upload.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) throw new Error('No auth token found');

      const formData = new FormData();
      formData.append('avatar', {
        uri: avatarUri,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      } as any);

      await axios.post('https://api.myklan.africa/public/api/upload/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert("Success", "Avatar uploaded successfully.");
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  };

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
        address,
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
      <View style={tw`mb-4`}>
        {avatarUri && (
          <Image
            source={{ uri: avatarUri }}
            style={tw`w-32 h-32 rounded-full mb-4`}
          />
        )}
        <Button title="Select Avatar" onPress={selectImage} />
      </View>
      {error ? (
        <Text style={tw`text-red-500 mb-4`}>{error}</Text>
      ) : null}
      <Pressable
        style={tw`bg-[#ffde59] py-2 px-4 rounded-md mt-4`}
        onPress={uploadAvatar}
      >
        <Text style={tw`text-black text-center text-lg font-medium`}>Upload Avatar</Text>
      </Pressable>
      <Pressable
        style={tw`bg-[#ffde59] py-2 px-4 rounded-md mt-4`}
        onPress={updateUser}
      >
        <Text style={tw`text-black text-center text-lg font-medium`}>Save Changes</Text>
      </Pressable>
    </ScrollView>
  );
};

export default EditProfile;
