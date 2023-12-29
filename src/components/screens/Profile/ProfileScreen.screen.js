import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Avatar, IconButton, Text, Portal, Modal, List, Divider, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ProfileCard = ({ profileData, onShowModal }) => (
    <View style={styles.profileContainer}>
        <IconButton icon='cog' style={styles.iconButton} onPress={onShowModal} />
        <Avatar.Image 
            size={100} 
            source={{ uri: profileData.profile_avatar }} 
            style={styles.avatar} 
            elevation={1} 
        />
        <Title style={styles.userName}>{profileData.employee_name}</Title>
        <Text style={styles.userRole}>{profileData.job_role}</Text>
        <Text style={styles.userLocation}>{profileData.location}</Text>
    </View>
);

const ProfileModal = ({ visible, onHideModal, onLogOut }) => {
    const navigation = useNavigation();

    const handleNavigate = (screenName) => {
        navigation.navigate(screenName);
        onHideModal();
    }

    return (
        <Portal>
            <Modal visible={visible} onDismiss={onHideModal} contentContainerStyle={styles.innerContainer} elevation={5}>
                <Title style={styles.modalTitle}>Menu</Title>
                <List.Section>
                    <List.Item
                        title="Edit Profile"
                        left={() => <List.Icon icon="account-edit" />}
                        onPress={() => handleNavigate('EditProfile')}
                    />
                    <Divider />
                    <List.Item
                        title="Settings"
                        left={() => <List.Icon icon="cog-outline" />}
                        onPress={() => handleNavigate('Settings')}
                    />
                    <Divider />
                    <List.Item
                        title="Log Out"
                        left={() => <List.Icon icon="logout" />}
                        onPress={onLogOut}
                    />
                </List.Section>
            </Modal>
        </Portal>
    );
};

const ProfileScreen = () => {
    const [profileData, setProfileData] = useState({});
    const [visible, setVisible] = useState(false);
    const auth = getAuth();
    const user = getAuth().currentUser.uid;
    const db = getDatabase();

    useEffect(() => {
        const userRef = ref(db, `employees/${user}`);
        return onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            setProfileData(data || {});
        });
    }, [user]);

    const handleLogOut = async () => {
        try {
            await signOut(auth);
            console.log('User signed out!');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ProfileCard 
                profileData={profileData} 
                onShowModal={() => setVisible(true)} 
            />
            <ProfileModal 
                visible={visible} 
                onHideModal={() => setVisible(false)} 
                onLogOut={handleLogOut} 
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight || 0,
    },
    profileContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    avatar: {
        marginBottom: 10,
    },
    iconButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    userRole: {
        fontSize: 18,
        color: '#666',
    },
    userLocation: {
        fontSize: 16,
        color: '#888',
    },
    innerContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default ProfileScreen;
