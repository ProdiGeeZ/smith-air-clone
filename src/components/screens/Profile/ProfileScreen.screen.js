import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Avatar, Card, IconButton, Text, Portal, Modal, List, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


function ProfileCard(props) {
    return (<View style={styles.mainContainer}>
        <Card style={styles.profileContainer}>
            <Card.Content style={styles.contentBox}>
                <IconButton icon={'cog'} style={styles.iconButton} onPress={props.showModal}></IconButton>
                <Avatar.Image size={100} source={{
                    uri: props.profileData.profile_avatar
                }} style={styles.avatar} elevation={1} />
                <Text variant={'titleLarge'}>{props.profileData.employee_name}</Text>
                <Text variant={'titleMedium'}>{props.profileData.job_role}</Text>
                <Text variant={'titleSmall'}>{props.profileData.location}</Text>
            </Card.Content>
        </Card>
    </View>);
}



function ProfileModal(props) {
    // Using useNavigation to get access to navigation
    const navigation = useNavigation();

    return (
        <Portal>
            <Modal visible={props.visible} onDismiss={props.hideModal} contentContainerStyle={styles.innerContainer} elevation={5}>
                <Text style={styles.modalTitle}>Menu</Text>
                <List.Section>
                    <List.Item title="Edit Profile" left={() => <List.Icon icon="account-edit" />} onPress={() => navigation.navigate('EditProfile')} />
                    <Divider />
                    <List.Item title="Settings" left={() => <List.Icon icon="cog-outline" />} onPress={() => navigation.navigate('Settings')} />
                    <Divider />
                    <List.Item title="Log Out" left={() => <List.Icon icon="logout" />} onPress={props.logOut} />
                </List.Section>
            </Modal>
        </Portal>
    );
}



const ProfileScreen = ({ onOpenSettings }) => {
    const [profileData, setProfileData] = useState({});
    const [visible, setVisible] = React.useState(false);
    const auth = getAuth();
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

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const logOut = () => {
        signOut(auth)
            .then(() => console.log('User signed out!'))
            .catch(error => console.error("Error signing out:", error));
    };


    return (
        <SafeAreaView style={styles.container}>
            <ProfileCard profileData={profileData} showModal={showModal}></ProfileCard>
            <Card style={styles.profileContainer}>
                <Card.Content style={styles.contentBox}>
                    <Text variant={'titleLarge'} style={{ fontWeight: 'bold' }}>Next Scheduled Shift</Text>
                    <Text variant={'titleLarge'} >{profileData.next_shift}</Text>
                    <Text variant={'titleSmall'}>{profileData.location}</Text>
                </Card.Content>
            </Card>
            <ProfileModal visible={visible} hideModal={hideModal} logOut={logOut} onOpenSettings={onOpenSettings}></ProfileModal>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
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
        padding: 20,
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
        marginBottom: 10,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    iconButton: {
        position: 'fixed',
        top: -30,
        right: -160,
        margin: 0,
        padding: 0,
    },
    innerContainer: {
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '50%',
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }
});
