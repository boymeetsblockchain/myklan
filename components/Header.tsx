import { useEffect, useState } from "react";
import getUserDetails from "../hooks/getUser";
import { useNavigation } from "expo-router";
import { Image, View,Pressable } from "react-native";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { User } from "../types/user";
import tw from 'twrnc'

export const CustomHeader =() =>{
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const userDetails = await getUserDetails()
          setUser(userDetails);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserDetails();
    }, []);
    const navigation = useNavigation();
    return (
      <View style={tw`w-full h-20 bg-black flex flex-row items-center justify-between px-4`}>
        <Pressable onPress={() => navigation.openDrawer()}>

          <Image
  source={{ uri: `https://myklan.africa/public/uploads/avatar/${user?.avatar}` }}
            style={{ width: 30, aspectRatio: 1, borderRadius: 40 }}
          />
        </Pressable>
        <Image
          source={require('../assets/logo.jpg')}
          style={tw`h-12 w-12`}
        />
        <Pressable>
         <Link href={'/setting'}>
         <FontAwesome name='gear' color={"#ffffff"} size={24}/>
         </Link>
        </Pressable>
      </View>
    );
  }