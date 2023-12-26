import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { FIREBASE_DB } from '../../../../firebaseConfig';
import { Avatar, Card, IconButton, Text, MD3Colors } from 'react-native-paper';


const ProfileScreen = () => {
    const [profileData, setProfileData] = useState({});

    const user = getAuth().currentUser.uid;
    const db = getDatabase();

    useEffect(() => {
        let isMounted = true;
        const userRef = ref(db, `employees/${user}`);
        onValue(userRef, (snapshot) => {
            if (isMounted) {
                const data = snapshot.val();
                setProfileData(data);
            }
        });
        return () => {
            isMounted = false;
        };
    }, [user]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContainer}>
                <Card style={styles.profileContainer}>
                    <Card.Content style={styles.contentBox}>
                        <IconButton icon={'cog-outline'} style={styles.iconButton}></IconButton>
                        <Avatar.Image size={100} source={{ uri: profileData.avatar ? profileData.avatar : '' }} style={styles.avatar} elevation={1} />
                        <Text variant={'titleLarge'}>{profileData.employee_name}</Text>
                        <Text variant={'titleMedium'}>{profileData.job_role}</Text>
                        <Text variant={'titleSmall'}>{profileData.location}</Text>
                    </Card.Content>
                </Card>
            </View>
            <Card style={styles.profileContainer}>
                <Card.Content style={styles.contentBox}>
                    <Text variant={'titleLarge'} style={{ fontWeight: 'bold' }}>Next Scheduled Shift</Text>
                    <Text variant={'titleLarge'} >{profileData.next_shift}</Text>
                    <Text variant={'titleSmall'}>{profileData.location}</Text>
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
    },
    mainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#265fa5',
        paddingTop: 20,
        paddingBottom: 35,
        shadowColor: "#000",
        width: '100%',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileContainer: {
        position: 'relative',
        marginTop: 20,
        padding: 35,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        borderColor: 'transparent',
        backgroundColor: '#ffffff',
    },
    contentBox: {
        alignItems: 'center',
        justifyContent: 'center',
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
        marginBottom: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        borderColor: 'transparent',
        overflow: 'hidden',
    },
    iconButton: {
        position: 'absolute',
        top: -30,
        right: 0,
        margin: 0,
    },
});
