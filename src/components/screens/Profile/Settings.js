import React, { useState } from 'react';
import { Modal, Portal, Text, TextInput, Button, PaperProvider } from 'react-native-paper';

const ProfileSettings = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSave = () => {
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <View>
            <Text>Profile Settings</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Save" onPress={handleSave} />
        </View>
    );
};

export default ProfileSettings;
