import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar } from 'react-native';
import Announcements from './Announcements';
import Rota from './Rota';
import Social from './Social';
import Posts from './Posts';

const TopTab = createMaterialTopTabNavigator();

const HomeTopTabs = () => {
    return (
        <TopTab.Navigator>
            <TopTab.Screen name="Recent" component={Announcements} />
            <TopTab.Screen name="Rota" component={Rota} />
            <TopTab.Screen name="Social" component={Social} />
            <TopTab.Screen name="Posts" component={Posts} />
        </TopTab.Navigator>
    );
};

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <HomeTopTabs />
            <Text>Home Screen</Text>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 0,
    },
    topTabNavigator: {
        flex: 1, 
        backgroundColor: 'lightblue', 
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    },
});