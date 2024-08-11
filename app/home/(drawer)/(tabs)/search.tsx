import React from 'react';
import { View, Text, Pressable } from 'react-native';
import tw from 'twrnc';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const FilterButtons = () => {
  return (
    <View style={tw`flex-col bg-black gap-y-4 p-4 flex-1`}>
      {/* New Creators Button */}
      <View style={tw`bg-[#ffde59] p-4 rounded-md h-20`}>
        <Link href={'/creators/new'} asChild>
          <Pressable style={tw`flex-1 flex-row items-center justify-center`}>
            <MaterialIcons name="fiber-new" size={24} color="white" style={tw`mr-2`} />
            <Text style={tw`text-center text-white font-bold`}>New Creators</Text>
          </Pressable>
        </Link>
      </View>

      {/* Free Creators Button */}
      <View style={tw`bg-[#ffde59] p-4 rounded-md h-20`}>
        <Link href={'/creators/free'} asChild>
          <Pressable style={tw`flex-1 flex-row items-center justify-center`}>
            <MaterialIcons name="attach-money" size={24} color="white" style={tw`mr-2`} />
            <Text style={tw`text-center text-white font-bold`}>Free Creators</Text>
          </Pressable>
        </Link>
      </View>

      {/* Featured Creators Button */}
      <View style={tw`bg-[#ffde59] p-4 rounded-md h-20`}>
        <Link href={'/creators/feature'} asChild>
          <Pressable style={tw`flex-1 flex-row items-center justify-center`}>
            <MaterialIcons name="star" size={24} color="white" style={tw`mr-2`} />
            <Text style={tw`text-center text-white font-bold`}>Featured Creators</Text>
          </Pressable>
        </Link>
      </View>

      {/* More Active Creators Button */}
      <View style={tw`bg-[#ffde59] p-4 rounded-md h-20`}>
        <Link href={'/creators/active'} asChild>
          <Pressable style={tw`flex-1 flex-row items-center justify-center`}>
            <MaterialIcons name="trending-up" size={24} color="white" style={tw`mr-2`} />
            <Text style={tw`text-center text-white font-bold`}>More Active Creators</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default FilterButtons;
