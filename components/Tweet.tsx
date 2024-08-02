import { Image, Pressable,Text,View} from "react-native";
import tw from 'twrnc';
import { TweeterProps } from "../types/tweet";
import { Entypo } from '@expo/vector-icons';
import IconButton from "./IconButton";
import { Link } from "expo-router";

export default function Tweet({ tweet }: TweeterProps) {
  return (
    <Link href={`/tweets/${tweet.id}`} asChild>
      <Pressable style={tw`flex-col p-3 border-b my-4 gap-y-4 flex-1 border-gray-800 bg-black`}>
      <View style={tw`ml-3 flex flex-row gap-x-3`}>
        <Image source={{ uri: tweet.user.image }} style={tw`h-12 w-12 rounded-full`}  />
          <View style={tw`flex-row items-center`}>
            <Text style={tw`font-light text-lg font-bold text-white`}>{tweet.user.name}</Text>
            <Text style={tw`ml-2 text-gray-400`}>{tweet.user.username} .2h</Text>
            <Entypo
              name="dots-three-horizontal"
              size={16}
              color="gray"
              style={tw`ml-auto`}
            />
          </View>
         
        
        
        </View>
        <View>
        <Text style={tw`text-white leading-5 px-2`}>{tweet.content}</Text>
          {tweet.image && (
            <Image source={{ uri: tweet.image }} style={tw`w-full aspect-16/9 mt-3 rounded-lg`} />
          )}
           <View style={tw`flex-row my-2 justify-between`}>
            <View style={tw `flex-row gap-x-3`}>   
            <IconButton icon="comment" text={tweet.numberOfComments} />
            <IconButton icon="heart" text={tweet.numberOfLikes} />
            <IconButton icon="share-apple" />
            </View>
          
            <IconButton icon="tag"  />
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
