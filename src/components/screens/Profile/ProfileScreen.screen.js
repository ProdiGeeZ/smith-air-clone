import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { User, getAuth, signOut } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Button, Card, Text } from 'react-native-paper';


const ProfileScreen = () => {
    const user = getAuth().currentUser.email;
    return (
        <SafeAreaView style={styles.container}>
            <Card elevation={5} style={styles.profileContainer}>
                <Avatar.Image size={100} source={require('../../../../assets/WHSmith-Logo.wine.png')} style={styles.avatar} />
                <Card.Content >
                    <Text variant='titleMedium'>Mohammed Saabir Ahmed</Text>
                    <Text>{user}</Text>
                    <Text variant='titleSmall'>Sales Assistant</Text>
                </Card.Content>
            </Card>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#265fa5',
        paddingBottom: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileContainer: {
        marginTop: 20,
        padding: 35,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        borderColor: 'transparent',
        backgroundColor: '#ffffff',
    },
    submitButton: {
        marginTop: 15,
        backgroundColor: '#0b4589',
        width: '50%',
    },
    inputFields: {
        marginTop: 20,
        backgroundColor: 'transparent',
    },
    avatar: {
        backgroundColor: 'none',
        marginBottom: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
        overflow: 'hidden',
    },
});
