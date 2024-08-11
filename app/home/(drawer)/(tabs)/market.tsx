import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, Pressable, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

interface ItemProps {
  id:string,
  price:string,
  title:string,
  image:string,
}


interface ItemProp{
  item:ItemProps
}
const marketplaceData = [
  {
    id: '1',
    title: 'Wireless Headphones',
    price: '$99.99',
    image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/headphones.jpg',
  },
  {
    id: '2',
    title: 'Smartwatch',
    price: '$199.99',
    image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/smartwatch.jpg',
  },
  {
    id: '3',
    title: 'Bluetooth Speaker',
    price: '$49.99',
    image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/speaker.jpg',
  },
  // Add more mock items here
];

const MarketplaceItem = ({item}:ItemProp) => (
  <View style={tw`bg-gray-800 p-4 rounded-md mb-4`}>
    <Image source={{ uri: item.image }} style={tw`w-full h-40 rounded-md`} />
    <Text style={tw`text-white text-lg font-bold mt-2`}>{item.title}</Text>
    <Text style={tw`text-yellow-500 text-lg`}>{item.price}</Text>
    <Pressable style={tw`bg-[#ffde59] py-2 px-4 rounded-md mt-2`}>
      <Text style={tw`text-black text-sm font-medium`}>Buy Now</Text>
    </Pressable>
  </View>
);

export default function MarketPlacePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for fetching marketplace data
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
        <Text style={tw`text-2xl font-bold text-white mb-4`}>Marketplace</Text>
      </View>

      <FlatList
        data={marketplaceData}
        renderItem={({ item }) => <MarketplaceItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={tw`pb-20`}
      />
    </View>
  );
}
