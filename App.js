import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import { HomeScreen, LoginScreen, ProfileScreen, Settings, LoadingComponent, EditProfile } from './src/index';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { PaperProvider } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const BottomNavBar = () => {
    return (
      <MaterialBottomTabs.Navigator initialRouteName="Home" activeColor="#3989f0" inactiveColor="gray" barStyle={{ backgroundColor: 'white' }}>
        <MaterialBottomTabs.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => <MaterialIcons name="home" color={color} size={26} />
          }} 
        />
        <MaterialBottomTabs.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => <MaterialIcons name="person" color={color} size={26} />
          }} 
        />
      </MaterialBottomTabs.Navigator>
    );
  };

  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1}}>
        <NavigationContainer>
          {loading ? (
            <LoadingComponent />
          ) : user ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Main" component={BottomNavBar} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default App;
