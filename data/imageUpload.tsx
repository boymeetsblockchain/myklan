import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert, Button, Image } from 'react-native';
import tw from 'twrnc';
import { User } from '../../types/user';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import getUserDetails from '../../../hooks/getUser';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

const EditProfile = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [story, setStory] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [birthday, setBirthday] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

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
        setPhone(userDetails.phone);
        setWebsite(userDetails.website);
        setBirthday(userDetails.birthday);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUserDetails();
  }, []);

  const selectImage = async (useLibrary: boolean) => {
    let result;
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    // Save image if not cancelled
    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const uriToBlob = (uri: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response as Blob);
      };
      xhr.onerror = function () {
        reject(new Error('Failed to convert URI to Blob'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  };

  const updateUser = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        throw new Error('No auth token found');
      }

      const formData = new FormData();

      // Add other profile fields to formData
      formData.append('name', name);
      formData.append('username', username);
      formData.append('story', story);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('phone', phone);
      formData.append('website', website);
      formData.append('birthday', birthday);

      // Add the avatar if selected
      if (avatarUri) {
        const blob = await uriToBlob(avatarUri);
        formData.append('avatar', blob, 'avatar.jpg');
      }

      await axios.put(`https://api.myklan.africa/public/api/user/${user?.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
        <View style={tw`flex-row items-center bg-gray-800 p-2 rounded-md`}>
          <MaterialIcons name="person" size={24} color="white" />
          <TextInput
            style={tw`text-white ml-2 flex-1`}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor="gray"
          />
        </View>
      </View>
      <View style={tw`mb-4`}>
        <Text style={tw`text-white mb-2`}>Username</Text>
        <View style={tw`flex-row items-center bg-gray-800 p-2 rounded-md`}>
          <MaterialIcons name="account-circle" size={24} color="white" />
          <TextInput
            style={tw`text-white ml-2 flex-1`}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your username"
            placeholderTextColor="gray"
          />
        </View>
      </View>
      <View style={tw`mb-4`}>
        <Text style={tw`text-white mb-2`}>About</Text>
        <View style={tw`flex-row items-center bg-gray-800 p-2 rounded-md`}>
          <MaterialIcons name="info" size={24} color="white" />
          <TextInput
            style={tw`text-white h-20 flex-1`}
            value={story}
            onChangeText={setStory}
            placeholder="Tell us about yourself"
            placeholderTextColor="gray"
          />
        </View>
      </View>
      <View style={tw`mb-4`}>
        <Text style={tw`text-white mb-2`}>Address</Text>
        <View style={tw`flex-row items-center bg-gray-800 p-2 rounded-md`}>
          <MaterialIcons name="location-on" size={24} color="white" />
          <TextInput
            style={tw`text-white ml-2 flex-1`}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            placeholderTextColor="gray"
          />
        </View>
      </View>
      <View style={tw`mb-4`}>
        <Text style={tw`text-white mb-2`}>City</Text>
        <View style={tw`flex-row items-center bg-gray-800 p-2 rounded-md`}>
          <MaterialIcons name="location-city" size={24} color="white" />
          <TextInput
            style={tw`text-white ml-2 flex-1`}
            value={city}
            onChangeText={setCity}
            placeholder="Enter your city"
            placeholderTextColor="gray"
          />
        </View>
      </View>
      <View style={tw`mb-4`}>
        <Text style={tw`text-white mb-2`}>Phone</Text>
        <View style={tw`flex-row items-center bg-gray-800 p-2 rounded-md`}>
          <MaterialIcons name="phone" size={24} color="white" />
          <TextInput
            style={tw`text-white ml-2 flex-1`}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            placeholderTextColor="gray"
          />
        </View>
      </View>
      <View style={tw`mb-4`}>
        <Text style={tw`text-white mb-2`}>Website</Text>
        <View style={tw`flex-row items-center bg-gray-800 p-2 rounded-md`}>
          <MaterialIcons name="web" size={24} color="white" />
          <TextInput
            style={tw`text-white ml-2 flex-1`}
            value={website}
            onChangeText={setWebsite}
            placeholder="Enter your website"
            placeholderTextColor="gray"
          />
        </View>
      </View>
      <View style={tw`mb-4`}>
        <Text style={tw`text-white mb-2`}>Birthday</Text>
        <View style={tw`flex-row items-center bg-gray-800 p-2 rounded-md`}>
          <MaterialIcons name="cake" size={24} color="white" />
          <TextInput
            style={tw`text-white ml-2 flex-1`}
            value={birthday}
            onChangeText={setBirthday}
            placeholder="Enter your birthday"
            placeholderTextColor="gray"
          />
        </View>
      </View>
      <Button title='Select Image' onPress={() => selectImage(true)} />
      {avatarUri && (
        <Image
          source={{ uri: avatarUri }}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
        />
      )}
      {error ? (
        <Text style={tw`text-red-500 mb-4`}>{error}</Text>
      ) : null}
      <Pressable
        style={tw`bg-[#ffde59] py-2 px-4 rounded-md mt-4`}
        onPress={updateUser}
      >
        <Text style={tw`text-black text-center text-lg text-white font-medium`}>Save Changes</Text>
      </Pressable>
    </ScrollView>
  );
};

export default EditProfile;
