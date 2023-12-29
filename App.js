import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './firebaseConfig';
import { PaperProvider } from 'react-native-paper';

import Header from './src/components/base/Header';
import { HomeScreen, LoginScreen, ProfileScreen, Settings, LoadingComponent, EditProfile, Notifications, Contacts } from './src/index';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();
const MaterialBottomTabs = createMaterialBottomTabNavigator();

const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        return onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
    }, []);

    const BottomNavBar = () => (
        <MaterialBottomTabs.Navigator
            initialRouteName="Home"
            activeColor="#3989f0"
            inactiveColor="gray"
            barStyle={{ backgroundColor: 'white' }}
            shifting={true}
            labeled={true}
        >
            <MaterialBottomTabs.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <MaterialIcons name="home" color={color} size={26} />,
                    tabBarColor: '#6200EE',
                }}
            />
            <MaterialBottomTabs.Screen
                name="Contacts"
                component={Contacts}
                options={{
                    tabBarLabel: 'Contacts',
                    tabBarIcon: ({ color }) => <MaterialIcons name="contacts" color={color} size={26} />,
                    tabBarColor: '#6200EE',
                }}
            />
        </MaterialBottomTabs.Navigator>
    );

    return (
        <PaperProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <NavigationContainer>
                    {loading ? (
                        <LoadingComponent />
                    ) : user ? (
                        <Stack.Navigator>
                            <Stack.Screen
                                name="HomeStack"
                                component={BottomNavBar}
                                options={{ header: () => <Header /> }}
                            />
                            <Stack.Screen name="EditProfile" component={EditProfile} />
                            <Stack.Screen name="Settings" component={Settings} />
                            <Stack.Screen name="Notifications" component={Notifications} />
                            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
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
