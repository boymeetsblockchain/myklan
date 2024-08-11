import axios from 'axios';
import { Link, useRouter,router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
 

  const onSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post("https://api.myklan.africa/public/api/login", {
        email,
        password
      });

      setLoading(false);

      if (response.data.status) {
        const token = response.data.token;
        await AsyncStorage.setItem('authToken', token);
        router.push('/home');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      setError('Invalid credentials.');
    }
  };

  return (
    <View style={tw`flex-1 bg-black items-center justify-center px-8`}>
      <Text style={tw`text-white my-4 text-2xl font-bold`}>
        Login to continue
      </Text>

      {error ? (
        <View style={tw`bg-red-600 p-4 mb-4 rounded-md w-full flex-row items-center`}>
          <MaterialIcons name="error" size={24} color="white" />
          <Text style={tw`text-white ml-2`}>
            {error}
          </Text>
        </View>
      ) : null}

      <View style={tw`bg-transparent  border border-white p-4 mb-4 rounded-md w-full flex-row items-center`}>
        <MaterialIcons name="email" size={24} color="white" />
        <TextInput
          style={tw`text-white ml-2 border  flex-1`}
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={tw`bg-transparent  border border-white p-4 mb-4 rounded-md w-full flex-row items-center`}>
        <MaterialIcons name="lock" size={24} color="white" />
        <TextInput
          style={tw`text-white ml-2 border  flex-1`}
          placeholder="Password"
          placeholderTextColor="gray"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity
        style={tw`w-full bg-[#ffde59] py-3 flex items-center justify-center rounded-md mb-4`}
        onPress={onSubmit}
        disabled={loading}
      >
        <Text style={tw`text-center text-white text-xl font-bold`}>
          {loading ? <ActivityIndicator color={"#fff"} size={"large"} /> : 'Login'}
        </Text>
      </TouchableOpacity>

      <Link href={'/auth/register'}>
        <Text style={tw`text-gray-400 text-center font-bold mt-8`}>Don't have an account? </Text>
      </Link>
    </View>
  );
}
