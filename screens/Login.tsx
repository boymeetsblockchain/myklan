import tw from 'twrnc';
import React from 'react';
import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login({navigation}:any) {
  return (
    <View style={tw`flex-1 items-center justify-center bg-gray-100`}>
      <View style={tw`w-full max-w-md p-8 bg-white shadow-lg rounded-lg`}>
        <Text style={tw`text-center text-2xl font-bold text-gray-700 mb-6`}>Login in to Continue</Text>
        
        <View style={tw`flex flex-col gap-y-4`}>
          <TextInput 
            placeholder='Username or Email' 
            style={tw`w-full p-4 border border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-400`} 
          />
          <TextInput 
            placeholder='Password' 
            secureTextEntry={true} 
            style={tw`w-full p-4 border border-gray-300 rounded-lg text-gray-700 placeholder:text-gray-400`} 
          />
        </View>
        
        <Text style={tw`text-right text-gray-400 mt-2 mb-6`}>
          Forgot Password?
        </Text>
        
        <View style={tw`flex items-center`}>
          <Pressable style={tw`bg-black py-3 px-6 rounded-lg w-full`}>
            <Text style={tw`text-white text-center text-lg`}>Login</Text>
          </Pressable>
        </View>
        
        <TouchableOpacity style={tw`text-center text-gray-500 mt-8`} onPress={()=>navigation.navigate('Register')}>
        <Text>  Don't have an account? <Text style={tw`text-blue-600 underline`}>Sign Up</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
