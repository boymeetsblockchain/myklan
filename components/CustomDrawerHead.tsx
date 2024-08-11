import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Image, Text, View } from "react-native";
import { useState,useEffect } from "react";
import tw from 'twrnc'
import { User } from "../types/user";
import getUserDetails from "../hooks/getUser";

export const  CustomDrawerContent= (props: any)=> {
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
    return (
      <DrawerContentScrollView {...props}>
        <View style={tw`flex items-center flex-col bg-black py-4`}>
          <Image
          source={{ uri: `https://myklan.africa/public/uploads/avatar/${user?.avatar}` }}
            style={{ width: 60, aspectRatio: 1, borderRadius: 40 }}
          />
          <Text style={tw`text-white text-lg mt-2 font-bold`}>@{user?.username}</Text>
          <View style={tw`flex flex-row justify-between gap-x-6 mt-2`}>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  }
  