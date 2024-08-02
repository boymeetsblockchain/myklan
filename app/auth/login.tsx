import axios from 'axios';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, View, Pressable, Alert, ActivityIndicator } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

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
        
        Alert.alert('Success', 'Login successful', [
          { text: 'OK', onPress: () => router.push('/home') }
        ]);
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      setError('Invalid credentials.');
    }
  }

  return (
    <View style={tw`flex-1 bg-black items-center justify-center px-8`}>
      <Text style={tw`text-white my-4 text-4xl font-bold`}>
        Login to MyKlan
      </Text>

      {error ? (
        <Text style={tw`text-red-500 items-center justify-center text-2xl mb-4`}>
          <MaterialIcons name="error" size={24} color="red" /> {error}
        </Text>
      ) : null}

      <TextInput
        style={tw`bg-gray-800 text-white w-full p-4 mb-4 rounded-md`}
        placeholder="Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={tw`bg-gray-800 text-white w-full p-4 mb-4 rounded-md`}
        placeholder="Password"
        placeholderTextColor="gray"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable
        style={tw`w-full bg-[#ffde59] py-3 flex items-center justify-center rounded-md mb-4`}
        onPress={onSubmit}
        disabled={loading}
      >
        <Text style={tw`text-center text-white text-xl font-bold`}>
          {loading ? <ActivityIndicator color={"#fff"} size={"large"} /> : 'Login'}
        </Text>
      </Pressable>

      <Link href={'/auth/register'}>
        <Text style={tw`text-gray-400 text-center mt-4`}>Don't have an account? Sign up</Text>
      </Link>
    </View>
  );
}
