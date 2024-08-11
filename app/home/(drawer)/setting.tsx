import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, Alert, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { useRouter, Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import getUserDetails from '../../../hooks/getUser';

const SettingsPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails();
        setUser(userDetails);
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    router.push('/auth/login');
  };

  if (loading) {
    return (
      <View style={tw`flex-1 bg-black justify-center items-center`}>
        <ActivityIndicator size="large" color="#ffde59" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 bg-black justify-center items-center`}>
        <Text style={tw`text-red-500`}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={tw`flex-1 bg-black p-4`}>
      <View style={tw`mb-4`}>
        <Text style={tw`text-2xl font-bold text-white mb-4`}>Settings</Text>
      </View>
      
      <Pressable style={tw`flex-row items-center bg-gray-800 p-4 rounded-md mb-4`} onPress={() => router.push('/editprofile')}>
        <MaterialIcons name="edit" size={24} color="white" />
        <Text style={tw`text-white ml-4`}>Edit Profile</Text>
      </Pressable>
      
      <Pressable style={tw`flex-row items-center bg-gray-800 p-4 rounded-md mb-4`} onPress={() => router.push('/change-password')}>
        <MaterialIcons name="lock" size={24} color="white" />
        <Text style={tw`text-white ml-4`}>Change Password</Text>
      </Pressable>
      
      <Pressable style={tw`flex-row items-center bg-red-600 p-4 rounded-md mb-4`} onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="white" />
        <Text style={tw`text-white ml-4`}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
};

export default SettingsPage;
