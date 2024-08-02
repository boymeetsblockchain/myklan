import axios from 'axios';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, View, Pressable, Alert, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';


export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter()
  const onSubmit = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post("https://api.myklan.africa/public/api/register", {
        email, name, password, password_confirmation:confirmPassword
      });

      setLoading(false);

      if (response.data.success) {
        Alert.alert('Success', 'Registration successful', [{ text: 'OK', onPress: () => { 
          router.push('/auth/login')
         } }]);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      console.log(err)
      setLoading(false);
      setError('An error occurred. Please try again.');
    }
  }

  return (
    <View style={tw`flex-1 bg-black items-center justify-center px-8`}>
      <Text style={tw`text-white my-4 text-4xl font-bold`}>
        Register for MyKlan
      </Text>

      {error ? <Text style={tw`text-red-500 flex items-center text-2xl justify-center mb-4`}>
      <MaterialIcons name="error" size={24} color="red" /> 
        {error}</Text> : null}

      <TextInput
        style={tw`bg-gray-800 text-white w-full p-4 mb-4 rounded-md`}
        placeholder="Name"
        placeholderTextColor="gray"
        value={name}
        onChangeText={setName}
      />
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
      <TextInput
        style={tw`bg-gray-800 text-white w-full p-4 mb-4 rounded-md`}
        placeholder="Confirm Password"
        placeholderTextColor="gray"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Pressable 
        style={tw`w-full bg-[#ffde59] py-3 flex items-center justify-center rounded-md mb-4`}
        onPress={onSubmit}
        disabled={loading}
      >
        <Text style={tw`text-center text-black text-xl font-bold`}>{loading ? <ActivityIndicator color={"#fff"} size={"large"}/>  : 'Register'}</Text>
      </Pressable>

      <Link href={'/auth/login'}>
        <Text style={tw`text-gray-400 text-center mt-4`}>Already have an account? Login</Text>
      </Link>
    </View>
  );
}
