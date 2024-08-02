import {useRouter} from 'expo-router';
import React from 'react';
import { Image, Text, View, Pressable,ActivityIndicator} from 'react-native';
import tw from 'twrnc';
import { useEffect, useState} from 'react';

export default function Page() {
  const router = useRouter()
  const [loading,setLoading]= useState<boolean>(true)
  useEffect(()=>{
    setTimeout(() => {
      setLoading(false)
      router.push('/auth/login')
    }, 4000);
   },[loading])
  return (
    <View style={tw`flex-1 bg-black items-center justify-center`}>
      <Image 
        source={require('../assets/logo.jpg')} 
        style={{ width: 200, height: 200 }} 
      />
      <Text style={tw`text-white my-4 text-4xl font-bold`}>
        Welcome to the MyKlan
      </Text>
      {
        loading  && (
          <ActivityIndicator  size={'large'}  color={'#ffde59'}/>
        )
      }
    </View>
  );
}
