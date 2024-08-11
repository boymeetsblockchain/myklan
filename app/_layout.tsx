import {  Stack } from 'expo-router';
export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <>
      <Stack>
         
           <Stack.Screen
                  name="index"
                  options={{ headerShown: false }}
                
                />
           <Stack.Screen
                  name="auth/register"
                  options={{ headerShown: false }}
                />
                 <Stack.Screen
          name="home"
          options={{ headerShown: false }}
        />
                 <Stack.Screen
          name="editprofile/index"
          options={{ headerShown: false }}
        />
                 <Stack.Screen
          name="post/index"
          options={{ headerShown: false }}
        />
                 <Stack.Screen
          name="profile/[username]"
          options={{ headerShown: false }}
        />
                 <Stack.Screen
          name="creators/active"
          options={{ headerShown: false }}
        />
                 <Stack.Screen
          name="creators/new"
          options={{ headerShown: false }}
        />
                 <Stack.Screen
          name="creators/feature"
          options={{ headerShown: false }}
        />
                 <Stack.Screen
          name="creators/free"
          options={{ headerShown: false }}
        />
      
      </Stack>

    </>
  );
}
