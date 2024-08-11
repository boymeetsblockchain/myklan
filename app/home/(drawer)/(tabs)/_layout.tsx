import React from 'react';
import { Tabs } from 'expo-router';
import tw from 'twrnc';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffde59',
        tabBarStyle: { backgroundColor: 'black' },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="compass" color={color} />,
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="shopping-bag" color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="mail" color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="bell" color={color} />,
        }}
      />
    </Tabs>
  );
}
