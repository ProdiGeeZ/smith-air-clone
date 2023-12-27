import React from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar } from 'react-native';

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Welcome to the HomeScreen!</Text>
            <Text>This is a placeholder content.</Text>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight || 0,
    }
});