import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Pressable } from 'react-native';
import tw from 'twrnc';

export default function CreateTweet() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Placeholder for image picker logic
    // Use expo-image-picker or another library here
    // const result = await ImagePicker.launchImageLibraryAsync();
    // if (!result.canceled) {
    //   setImage(result.uri);
    // }
  };

  const handleSubmit = () => {
    // Handle tweet submission logic here
    console.log({ name, description, image });
  };

  return (
    <View style={tw`flex-1 bg-black p-4`}>
      <Text style={tw`text-2xl font-bold text-white mb-4`}>Create Tweet</Text>

      <TextInput
        style={tw`bg-gray-200 p-3 mb-4 rounded-md`}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={tw`bg-gray-200 p-3 h-40 mb-4 rounded-md`}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Pressable 
        style={tw`bg-gray-200 p-3 mb-4 rounded-md items-center justify-center`}
        onPress={pickImage}
      >
        <Text>Select Image</Text>
      </Pressable>

      {image && <Image source={{ uri: image }} style={tw`w-full h-40 mb-4`} />}

      <Pressable 
        style={tw`bg-[#ffde59] p-4 rounded-md items-center justify-center`}
        onPress={handleSubmit}
      >
        <Text style={tw`text-black font-bold`}>Submit Tweet</Text>
      </Pressable>
    </View>
  );
}
