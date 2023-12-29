import React, { useState } from 'react';
import { StyleSheet, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

function EditProfile() {
    const [avatar, setAvatar] = useState('https://via.placeholder.com/150');
    const [displayName, setDisplayName] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleAvatarChange = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });


        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
        }
    };

    const handleSave = async () => {

    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.avatarSection} onPress={handleAvatarChange}>
                <Avatar.Image source={{ uri: avatar }} size={100} />
            </TouchableOpacity>

            <View style={styles.inputSection}>
                <TextInput
                    style={styles.input}
                    onChangeText={setDisplayName}
                    value={displayName}
                    placeholder="Display Name"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setBirthday}
                    value={birthday}
                    placeholder="Birthday"
                    keyboardType="default"
                />
            </View>

            <Button mode="contained" onPress={handleSave} style={styles.button}>
                Save
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    avatarSection: {
        alignItems: 'center',
        marginVertical: 20,
    },
    inputSection: {
        width: '80%',
        alignSelf: 'center',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        paddingVertical: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        alignSelf: 'center',
        marginVertical: 20,
        width: '60%',
    },
});

export default EditProfile;
