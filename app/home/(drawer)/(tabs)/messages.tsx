import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, Pressable } from 'react-native';
import tw from 'twrnc';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const messages = [
  { id: '1', sender: 'John Doe', message: 'Hey! How are you?' },
  { id: '2', sender: 'Jane Smith', message: 'Don’t forget our meeting tomorrow.' },
  { id: '3', sender: 'Mark Lee', message: 'Can you send me the files?' },
  // Add more mock messages here
];

const MessageItem = ({ sender, message }: { sender: string; message: string }) => (
  <View style={tw`bg-gray-800 p-4 rounded-md mb-4`}>
    <Text style={tw`text-white text-lg font-bold`}>{sender}</Text>
    <Text style={tw`text-gray-400`}>{message}</Text>
  </View>
);

const MessagePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for fetching messages
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <View style={tw`flex-1 bg-black justify-center items-center`}>
        <ActivityIndicator size="large" color="#ffde59" />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-black p-4`}>
      <View style={tw`mb-4`}>
        <Text style={tw`text-2xl font-bold text-white mb-4`}>Messages</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageItem sender={item.sender} message={item.message} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`pb-4`}
      />
    </View>
  );
};

export default MessagePage;
