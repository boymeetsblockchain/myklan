import { Image, Pressable, Text, View } from "react-native";
import tw from 'twrnc';
import { Entypo } from '@expo/vector-icons';
import IconButton from "./IconButton";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import getUserDetails from "../hooks/getUser";
import { Media } from "../types/post";
import { TimeAgo } from "../utils/timeago";
export type Post = {
  id: number;
  title: string;
  description: string;
  user_id: string;
  date: string;
  token_id: string;
  locked: string;
  fixed_post: string;
  price: string;
  status: string;
  video_views: string;
  ip: string;
  scheduled_date: string;
  schedule: string;
  editing: string;
  can_media_edit: string;
  media:Media[]
};


interface ProfilePostProps{
  post:Post,
  avatar:string,
  username:string,
}

export default function ProfilePost({post ,avatar,username}:ProfilePostProps) {
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
  }, [post.user_id]);

  if (loading) {
    return <Text style={tw`text-white`}>Loading...</Text>; 
  }

  if (error) {
    return <Text style={tw`text-red-500`}>Error: {error}</Text>; 
  }

  return (
    <View style={tw`flex-col p-3 flex-wrap justify-between  border-b border-gray-800 rounded-lg`}> 
      <Pressable style={tw`gap-y-4`}>
        <View style={tw`ml-3 flex flex-row gap-x-3`}>
          {user?.avatar ? (
            <Image 
              source={{ uri: `https://myklan.africa/public/uploads/avatar/${avatar}` }} 
              style={tw`h-8 w-8 rounded-full`} 
            />
          ) : null}
          <View style={tw`flex-row items-center flex-1`}>
            <View style={tw`flex flex-row items-center gap-x-3`}>
              <Text style={tw`font-bold text-2xl text-white`}>
                @{username}
              </Text>
              <Text style={tw`font-light text-sm text-gray-400`}>
                {username}
              </Text>
            </View>
            <Entypo
              name="dots-three-horizontal"
              size={16}
              color="gray"
              style={tw`ml-auto`}
            />
          </View>
        </View>

        {/* Post Content */}
        <View>
          <Text style={tw`text-white text-2xl text-gray-200 px-2`}>
            {post.description}
          </Text>
          {post.media && post.media.map((mediaItem: Media, index: number) => (
  mediaItem.type === 'image' ? (
    <Image
      key={index}
      source={{ uri: `https://myklan.africa/public/uploads/updates/images/${mediaItem.image}` }}
      style={tw`w-full aspect-16/9 mt-3 rounded-lg`}
    />
  ) : null
  // You can handle other types of media like videos here
))}

          <Text style={tw`text-white text-sm px-2 mt-2`}>
            {TimeAgo(post.date as string)}
          </Text>

          {/* Post Actions */}
          <View style={tw`flex-row my-2 justify-between`}>
            <View style={tw`flex-row gap-x-3`}>
              <IconButton icon="comment" text="0" /> 
              <IconButton icon="heart" text="0" /> 
              <IconButton icon="share-apple" />
            </View>
            <IconButton icon="tag" />
          </View>
        </View>
      </Pressable>
    </View>
  );
}
