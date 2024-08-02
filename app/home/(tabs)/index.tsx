import { FlatList, Pressable, Text } from 'react-native';
import tweets from '../../../data/tweet';
import { View } from 'react-native';
import tw from 'twrnc';
import Tweet from '../../../components/Tweet';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
export default function TabOneScreen() {
  return (
    <View style={tw`flex-1 bg-black`}>
      <FlatList
        data={tweets}
        renderItem={({ item }) => <Tweet tweet={item} />}
        keyExtractor={(item) => item.id.toString()}  
      />
      <Pressable style={tw`absolute bottom-10 right-3 bg-[#ffde59] p-4 rounded-full`}>
     <Link href={'/tweet'}>
     <FontAwesome5 name='pen-nib' color={"white"} size={24}/>
     </Link>
      </Pressable>
    </View>
  );
}
