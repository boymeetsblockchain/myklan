import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ActivityIndicator, Image } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function CreateTweet() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);  
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);  

    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        throw new Error('No auth token found');
      }

      // Create FormData to include image if selected
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);

      if (imageUri) {
        formData.append('image', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'post-image.jpg',
        } as any);
      }
      
      console.log(imageUri)
      await axios.post('https://api.myklan.africa/public/api/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert("Success", "Your post has been created.", [
        { text: 'OK', onPress: () => console.log('Post created successfully') }
      ]);

      // Reset form
      setTitle('');
      setDescription('');
      setPrice('');
      setImageUri(null);
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false); 
    }
  };

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={tw`flex-1 bg-black py-10 px-2`}>
      <Text style={tw`text-2xl font-bold text-white mb-4`}>Create Post</Text>

      <TextInput
        style={tw`bg-transparent border border-white text-white  p-3 mb-4 rounded-md`}
        placeholder="Title"
        placeholderTextColor={'white'}
        value={title}
        onChangeText={setTitle}
        editable={!loading}  // Disable input while loading
      />

      <TextInput
        style={tw`bg-transparent border border-white text-white  p-3 h-40 mb-4 rounded-md`}
        placeholder="Description"
        placeholderTextColor={'white'}
        value={description}
        onChangeText={setDescription}
        multiline
        editable={!loading}  // Disable input while loading
      />

      <TextInput
        style={tw`bg-transparent border border-white text-white  p-3 mb-4 rounded-md`}
        placeholderTextColor={'white'}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        editable={!loading}  // Disable input while loading
      />

      <View style={tw`flex-row justify-between mb-4`}>
        <Pressable 
          style={tw`flex-1 items-center p-3 bg-gray-800 rounded-md mr-2`}
          onPress={selectImage}  // Allow image selection
          disabled={loading}  // Disable file upload buttons while loading
        >
          <Ionicons name="image-outline" size={24} color="#ffde59" />
          <Text style={tw`text-gray-300 mt-1`}>Image</Text>
        </Pressable>
        
        <Pressable 
          style={tw`flex-1 items-center p-3 bg-gray-800 rounded-md mx-2`}
          onPress={() => Alert.alert('Upload', 'Upload a Video')}  // Placeholder for video
          disabled={loading}  // Disable file upload buttons while loading
        >
          <Ionicons name="videocam-outline" size={24} color="#ffde59" />
          <Text style={tw`text-gray-300 mt-1`}>Video</Text>
        </Pressable>
        
        <Pressable 
          style={tw`flex-1 items-center p-3 bg-gray-800 rounded-md mx-2`}
          onPress={() => Alert.alert('Upload', 'Upload Music')}  // Placeholder for music
          disabled={loading}  // Disable file upload buttons while loading
        >
          <FontAwesome5 name="music" size={24} color="#ffde59" />
          <Text style={tw`text-gray-300 mt-1`}>Music</Text>
        </Pressable>

        <Pressable 
          style={tw`flex-1 items-center p-3 bg-gray-800 rounded-md ml-2`}
          onPress={() => Alert.alert('Upload', 'Upload a ZIP File')}  // Placeholder for ZIP file
          disabled={loading}  
        >
          <MaterialIcons name="attach-file" size={24} color="#ffde59" />
          <Text style={tw`text-gray-300 mt-1`}>ZIP</Text>
        </Pressable>
      </View>

      {imageUri && (
        <View style={tw`mb-4`}>
          <Image
            source={{ uri: imageUri }}
            style={tw`w-full h-40 rounded-md`}
          />
        </View>
      )}

      {error ? (
        <Text style={tw`text-red-500 mb-4`}>{error}</Text>
      ) : null}

      <Pressable 
        style={[
          tw`p-4 rounded-md items-center justify-center`, 
          loading ? tw`bg-gray-600` : tw`bg-[#ffde59]`  // Change button color when loading
        ]}
        onPress={handleSubmit}
        disabled={loading}  // Disable button while loading
      >
        {loading ? (
          <ActivityIndicator size="small" color="black" />
        ) : (
          <Text style={tw`text-black font-bold`}>Submit Post</Text>
        )}
      </Pressable>
    </View>
  );
}
