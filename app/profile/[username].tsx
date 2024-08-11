import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable, ActivityIndicator, FlatList } from 'react-native';
import tw from 'twrnc';
import { Link, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Profile } from '../../types/profile';
import getProfileByUsername from '../../hooks/getProfileByUsername';
import ProfilePost from '../../components/ProfilePost';

export default function ProfilePage() {
  const { username } = useLocalSearchParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (username) {
          const userDetails = await getProfileByUsername(username as string);
          setProfile(userDetails);
        } else {
          throw new Error('Username is missing');
        }
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

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

  if (!profile) {
    return (
      <View style={tw`flex-1 bg-black justify-center items-center`}>
        <Text style={tw`text-red-500`}>Profile not found</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-black`}>
      <View>
        <View style={tw`relative`}>
          <Image
            source={{ uri: `https://myklan.africa/public/uploads/cover/${profile.user.cover}` }}
            style={tw`w-full h-40`}
          />
        </View>
        <View style={tw`px-4 -mt-12`}>
          <View style={tw`flex-col items-center relative`}>
            <View style={tw`relative`}>
              <Image
                source={{ uri: `https://myklan.africa/public/uploads/avatar/${profile.user.avatar}` }}
                style={tw`w-24 h-24 rounded-full border-4 border-black`}
              />
          
            </View>
            <Pressable style={tw`bg-[#ffde59] py-2 px-4 rounded-md`}>
              <Link href={'/editprofile'}>
                <Text style={tw`text-white text-sm font-medium`}>Edit Profile</Text>
              </Link>
            </Pressable>
          </View>
          <View style={tw`py-4`}>
            <Text style={tw`text-2xl font-bold text-white`}>{profile.user.name}</Text>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-gray-400 ml-2`}>@{profile.user.username}</Text>
            </View>
            <Text style={tw`text-gray-300 my-2`}>{profile.user.story}</Text>
          </View>
        </View>
      </View>
      <View style={tw`bg-black`}>
        <FlatList
          data={profile.updates.data}
          renderItem={({ item }) => <ProfilePost post={item} avatar={profile.user.avatar} username={profile.user.username}/>}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={tw`h-6`} />}
        />
      </View>
    </View>
  );
}
