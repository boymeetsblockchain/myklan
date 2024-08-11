import React from 'react';
import { View, Text, FlatList } from 'react-native';
import tw from 'twrnc';

const notifications = [
  { id: '1', title: 'New friend request', description: 'John Doe sent you a friend request.' },
  { id: '2', title: 'Message received', description: 'You have a new message from Jane.' },
  { id: '3', title: 'App update', description: 'Version 2.0 is now available.' },
];

const NotificationItem = ({ title, description }: { title: string; description: string }) => (
  <View style={tw`bg-black p-4 rounded-lg mb-4 shadow border-2 border-[#3d3d3d]`}>
    <Text style={tw`text-white text-base font-bold`}>{title}</Text>
    <Text style={tw`text-gray-400 text-sm`}>{description}</Text>
  </View>
);

export default function NotificationsScreen() {
  return (
    <View style={tw`flex-1 bg-black pt-6`}>
      <Text style={tw`text-white text-xl font-bold text-center mb-4`}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <NotificationItem title={item.title} description={item.description} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`px-4`}
      />
    </View>
  );
}
