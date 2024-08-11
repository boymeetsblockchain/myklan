import React, { useState, useEffect } from 'react';
import { FlatList, Pressable, Text, View, ActivityIndicator,TouchableOpacity} from 'react-native';
import axios from 'axios'
import tw from 'twrnc';
import Post from '../../../../components/Post'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post as PostProp } from '../../../../types/post';
import {useIsFocused} from '@react-navigation/native'

export default function TabOneScreen() {
  const [posts, setPosts] = useState<PostProp[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const focused = useIsFocused()

  useEffect(() => {
    const fetchPosts = async () => {

      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
          throw new Error('No auth token found');
        }

        const response = await axios.get('https://api.myklan.africa/public/api/myposts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data.data.data);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    
    if(focused){
        fetchPosts()
    }

    fetchPosts();
  }, [focused]);

  if (loading) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-black`}>
        <ActivityIndicator size="large" color="#ffde59" />
        <Text style={tw`text-white mt-4`}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-black`}>
        <Text style={tw`text-red-500`}>Error: {error}</Text>
        <Pressable onPress={() => setLoading(true)} style={tw`mt-4 bg-yellow-500 p-2 rounded`}>
          <Text style={tw`text-white`}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  if (!posts?.length) {
    return (
      <View style={tw`flex-1 items-center justify-center bg-black`}>
        <Text style={tw`text-white`}>No posts available</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-black`}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />} 
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={tw`absolute bottom-10 right-3 bg-[#ffde59] p-4 rounded-full`}>
        <Link href={'/post'}>
          <FontAwesome5 name="pen-nib" color={"white"} size={24} />
        </Link>
      </TouchableOpacity>
    </View>
  );
}
