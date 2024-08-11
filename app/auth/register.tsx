import axios from 'axios';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, View, Pressable, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'twrnc';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const onSubmit = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post("https://api.myklan.africa/public/api/register", {
        email, name, password, password_confirmation: confirmPassword
      });

      setLoading(false);

      if (response.data.success) {
        Toast.show({
          type: "success",
          text1: "User successfully registered"
        });
        router.push('/auth/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError('An error occurred. Please try again.');
    }
  }

  return (
    <View style={tw`flex-1 bg-black items-center justify-center px-8`}>
      <Text style={tw`text-white my-4 text-4xl font-bold`}>
        Register for MyKlan
      </Text>

      {error ? (
        <View style={tw`bg-red-600 p-4 mb-4 rounded-md w-full flex-row items-center`}>
          <MaterialIcons name="error" size={24} color="white" />
          <Text style={tw`text-white ml-2 flex-1`}>
            {error}
          </Text>
        </View>
      ) : null}

      <View style={tw`bg-transparent border border-white p-4 mb-4 rounded-md w-full flex-row items-center`}>
        <MaterialIcons name="person" size={24} color="white" />
        <TextInput
          style={tw`text-white ml-2 flex-1`}
          placeholder="Name"
          placeholderTextColor="gray"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={tw`bg-transparent border border-white p-4 mb-4 rounded-md w-full flex-row items-center`}>
        <MaterialIcons name="email" size={24} color="white" />
        <TextInput
          style={tw`text-white ml-2 flex-1`}
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={tw`bg-transparent border border-white p-4 mb-4 rounded-md w-full flex-row items-center`}>
        <MaterialIcons name="lock" size={24} color="white" />
        <TextInput
          style={tw`text-white ml-2 flex-1`}
          placeholder="Password"
          placeholderTextColor="gray"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={tw`bg-transparent border border-white p-4 mb-4 rounded-md w-full flex-row items-center`}>
        <MaterialIcons name="lock" size={24} color="white" />
        <TextInput
          style={tw`text-white ml-2 flex-1`}
          placeholder="Confirm Password"
          placeholderTextColor="gray"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      <Pressable
        style={tw`w-full bg-[#ffde59] py-3 flex items-center justify-center rounded-md mb-4`}
        onPress={onSubmit}
        disabled={loading}
      >
        <Text style={tw`text-center text-white text-xl font-bold`}>
          {loading ? <ActivityIndicator color={"#fff"} size={"large"} /> : 'Sign Up'}
        </Text>
      </Pressable>

      <Link href={'/auth/login'}>
        <Text style={tw`text-gray-400 text-center mt-4`}>Already have an account? Login</Text>
      </Link>
    </View>
  );
}
