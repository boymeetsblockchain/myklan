import { Image, Pressable, Text, View } from "react-native";
import tw from 'twrnc';
import { Media, Post as PostProp } from "../types/post"; 
import { Entypo } from '@expo/vector-icons';
import IconButton from "./IconButton";
import { TimeAgo } from "../utils/timeago";
export default function Post({ post }: { post: PostProp }) {
  return (
    <View style={tw `flex-1 `}>
    
      <Pressable style={tw`flex-col p-3 border-b my-4 gap-y-4 flex-1 border-gray-800 bg-black`}>
        <View style={tw`ml-3 flex flex-row gap-x-3`}>
        <Image source={{ uri: `https://myklan.africa/public/uploads/avatar/${post.creator.avatar}` }} 
          style={tw`h-8 w-8 rounded-full`} />
          <View style={tw`flex-row items-center flex-1`}>
            <View style={tw `flex flex-row items-center gap-x-3`}>
              <Text style={tw`font-bold text-2xl font-bold text-white`}>@{post.creator.username}</Text>
              <Text style={tw`font-light text-sm font-bold text-gray-400`}>{post.creator.username}</Text>
            </View>
            <Entypo
              name="dots-three-horizontal"
              size={16}
              color="gray"
              style={tw`ml-auto`}
            />
          </View>
        </View>

        <View>
          <Text style={tw`text-white  text-2xl text-gray-200  px-2`}>{post.description}</Text>
          {post.media && post.media.map((mediaItem: Media, index: number) => (
  mediaItem.type === 'image' ? (
    <Image
      key={index}
      source={{ uri: `https:\/\/myklan.africa\/public\/uploads\/updates\/images\/${mediaItem.image}` }}
      style={tw`w-full aspect-16/9 mt-3 rounded-lg`}
    />
  ) : null
  // You can handle other types of media like videos here
))}

               <Text style={tw`text-white text-sm  px-2 mt-2`}>{TimeAgo(post.date as string)}</Text>

          <View style={tw`flex-row my-2 justify-between`}>
            <View style={tw`flex-row gap-x-3`}>
              <IconButton icon="comment" text={post.comments_count} />
              <IconButton icon="heart" text={post.likes_count} />
              <IconButton icon="share-apple" />
            </View>

            <IconButton icon="tag" />
          </View>
        </View>
      </Pressable>
    </View>
  );
}
