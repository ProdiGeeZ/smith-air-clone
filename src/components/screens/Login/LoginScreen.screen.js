import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import LoginHandler from './LoginHandler';

const LoginScreen = () => {
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.main}>
                <Image
                    source={require('../../../../assets/WHSmith-Logo.wine.png')}
                    style={styles.logo}
                    resizeMode='contain'
                />
                    <Text style={styles.welcomeText}>Welcome to Smith Air Associate Hub!</Text>
                </View>
            </SafeAreaView>
            <LoginHandler />
        </>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight || 0 
    },
    logo: {
        width: Dimensions.get('window').width - 150,
        height: 50
    },
    welcomeText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    main: {
        flex: 1,
        paddingTop: 275,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
