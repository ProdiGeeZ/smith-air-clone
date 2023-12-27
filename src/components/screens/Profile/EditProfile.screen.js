import React from 'react'
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Avatar, IconButton, Button } from 'react-native-paper';

function EditProfile() {
    const [avatar, setAvatar] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleAvatarChange = () => {
        // Handle avatar change logic here
    };

    const handleDisplayNameChange = () => {
        // Handle display name change logic here
    };

    const handleBirthdayChange = () => {
        // Handle birthday change logic here
    };

    const handleSave = () => {
        // Handle save logic here
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleAvatarChange}>
                <Avatar.Image source={{ uri: avatar }} size={80} />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleDisplayNameChange}>
                <Text>{displayName}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleBirthdayChange}>
                <Text>{birthday}</Text>
            </TouchableOpacity>

            <Button onPress={handleSave}>Save</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default EditProfile;

