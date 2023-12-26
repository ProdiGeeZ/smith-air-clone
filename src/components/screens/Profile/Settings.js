import React, { useState } from 'react';
import { StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native';
import { getAuth, updateProfile, updateEmail, updatePassword, signOut } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, Button, Card, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';

const ProfileSettings = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const navigation = useNavigation();

    const [name, setName] = useState(user?.displayName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(user?.photoURL || '../../../../assets/user.jpg'); 

    const handleChoosePhoto = () => {
        const options = { noData: true }; 
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                setAvatar(response.uri);
                console.log(response.uri);
            }
        });
    };

    const handleSave = () => {
        if (user) {
            updateProfile(user, { displayName: name })
                .then(() => console.log('Profile Updated'))
                .catch(error => console.error("Error updating profile:", error));

            updateEmail(user, email)
                .then(() => console.log('Email Updated'))
                .catch(error => console.error("Error updating email:", error));

            if (password.trim()) {
                updatePassword(user, password)
                    .then(() => console.log('Password Updated'))
                    .catch(error => console.error("Error updating password:", error));
            }
        }
    };

    const logOut = () => {
        signOut(auth)
            .then(() => console.log('User signed out!'))
            .catch(error => console.error("Error signing out:", error));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Card style={styles.card}>
            <TouchableOpacity onPress={handleChoosePhoto}>
                    <Avatar.Image size={100} source={{ uri: avatar }} style={styles.avatar} elevation={1}/>
                </TouchableOpacity>
                <Card.Content>
                    <TextInput label="Name" value={name} onChangeText={setName} style={styles.input} />
                    <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} />
                    <TextInput label="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
                    <Button mode="contained" onPress={handleSave} style={styles.button}>Save</Button>
                    <Button mode="outlined" onPress={logOut} style={styles.button}>Log Out</Button>
                </Card.Content>
            </Card>
        </SafeAreaView>
    );
};

export default ProfileSettings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight || 0,
        backgroundColor: '#265fa5',
    },
    card: {
        width: '90%',
        padding: 20,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    avatar: {
        backgroundColor: 'none',
        marginBottom: 20,
        backgroundColor: '#265fa5',
        border: '1px solid #265fa5',
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'transparent',
    },
    button: {
        marginTop: 10,
        width: '80%',
    },
});
