import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LatestPosts from './LatestPosts';
import Rota from './Rota';
import Social from './Social';
import Posts from './Posts';
import { PostsProvider } from '../../base/PostContext';


const TopTab = createMaterialTopTabNavigator();

const HomeTopTabs = () => {

    return (
        <TopTab.Navigator
            screenOptions={{
                tabBarIndicatorStyle: styles.tabIndicator,
                tabBarLabelStyle: styles.tabLabel,
                tabBarStyle: styles.tabBar,
            }}>
            <TopTab.Screen name="Recent" component={LatestPosts} />
            <TopTab.Screen name="Rota" component={Rota} />
            <TopTab.Screen name="Social" component={Social} />
            <TopTab.Screen name="Posts" component={Posts} />
        </TopTab.Navigator>
    );
};

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <PostsProvider>
                <HomeTopTabs />
            </PostsProvider>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        width: '100%',
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
        color: '#333',
    },
    tabIndicator: {
        backgroundColor: '#3989f0',
    },
    tabLabel: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    tabBar: {
        backgroundColor: 'white',
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
