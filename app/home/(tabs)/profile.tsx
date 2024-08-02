import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, Pressable, Alert, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import Tweet from '../../../components/Tweet';
import { Link } from 'expo-router';
import getUserDetails from '../../../hooks/getUser';
import { User } from '../../../types/user';

// Mock data
const profileData = {
  coverImage: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/8.jpg',
  profileImage: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png',
  name: 'John Doe',
  username: '@johndoe',
  bio: 'Software Developer | Tech Enthusiast | Coffee Lover',
  location: 'San Francisco, CA',
  subscribers:200,
  followings:200,
  tweets: [
    {
      id: 't0',
      user: {
        id: 'u1',
        username: 'VadimNotJustDev',
        name: 'Vadim',
        image:
          'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png',
      },
      createdAt: '2020-08-27T12:00:00.000Z',
      content: 'Can you please check if the Subscribe button on Youtube works?',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/thumbnail.png',
      numberOfComments: 123,
      numberOfRetweets: 11,
      numberOfLikes: 10,
    },
    {
      id: '111111111',
      createdAt: '2023-04-28T08:30:00.000Z',
      user: {
        id: '123456789',
        name: 'Jeff B',
        username: 'bezos',
        image:
          'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/jeff.jpeg',
      },
      content:
        'Just had a great workout at the gym! 💪 #fitness #healthylifestyle',
      numberOfComments: 2,
      numberOfRetweets: 5,
      numberOfLikes: 25,
      impressions: 500,
    },
  ]
};




export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetails();
        setUser(userDetails);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);
 
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
    <View style={tw`flex-1 bg-black`}>
      <View>
        <Image source={{ uri: profileData.coverImage }} style={tw`w-full h-40`} />
        <View style={tw`px-4`}>
          <View style={tw`flex-row justify-between items-center mt-[-30]`}>
            <Image source={{ uri: profileData.profileImage }} style={tw`w-24 h-24 rounded-full border-4 border-black`} />
            <Pressable style={tw`bg-yellow-500 py-2 px-4 rounded-md`}>
              <Link href={'/editprofile'}>
              <Text style={tw`text-black text-sm font-medium`}>Edit Profile</Text>
              </Link>
            </Pressable>
          </View>
          <View style={tw`py-6`}>
            <Text style={tw`text-2xl font-bold text-white`}>{user?.name}</Text>
            <Text style={tw`text-gray-400 `}>{user?.username}</Text>
            <Text style={tw`text-gray-300 `}>{user?.story}</Text>
            <Text style={tw`text-gray-200 text-xs`}>{user?.address},{user?.city}</Text>
             <View style={tw`flex-row gap-x-10 `}>
             <Text style={tw`text-gray-400 text-xs`}>{profileData.subscribers} subscribers</Text>
             <Text style={tw`text-gray-400 text-xs`}>{profileData.followings} subscriptions</Text>
             </View>
          </View>
        </View>
      </View>
      <FlatList
        data={profileData.tweets}
        renderItem={({ item }) => <Tweet tweet={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <View style={tw`border-b border-gray-700 my-2`} />
        )}
        contentContainerStyle={tw`pb-20`}
      />
    </View>
  );
}
