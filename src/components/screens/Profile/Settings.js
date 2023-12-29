import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { getAuth, updateEmail, updatePassword, signOut } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, Button, Switch, Divider } from 'react-native-paper';

const SettingsScreen = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [notifications, setNotifications] = useState(true);

    const handleSave = async () => {
        if (user) {
            try {
                if (email !== user.email) {
                    await updateEmail(user, email);
                    console.log('Email updated!');
                }
                if (password) {
                    await updatePassword(user, password);
                    console.log('Password updated!');
                }
            } catch (error) {
                console.error("Error updating account:", error);
            }
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
            console.log('User signed out!');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.sectionTitle}>Settings</Text>
                
                <Text style={styles.subTitle}>Theme</Text>
                
                <Text style={styles.subTitle}>Notifications</Text>
                <View style={styles.row}>
                    <Text>Enable Notifications</Text>
                    <Switch value={notifications} onValueChange={setNotifications} />
                </View>

                <Text style={styles.subTitle}>Account</Text>
                <TextInput 
                    label="Email" 
                    value={email} 
                    onChangeText={setEmail} 
                    style={styles.input} 
                />
                <TextInput 
                    label="Password" 
                    secureTextEntry 
                    value={password} 
                    onChangeText={setPassword} 
                    style={styles.input} 
                />
                <Button mode="contained" onPress={handleSave} style={styles.button}>Save</Button>
                <Button mode="outlined" onPress={logOut} style={styles.button}>Log Out</Button>
                <Divider style={styles.divider} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    scrollView: {
        width: '100%',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        padding: 20,
    },
    subTitle: {
        fontSize: 18,
        padding: 15,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
    },
    input: {
        marginHorizontal: 15,
        marginBottom: 15,
    },
    button: {
        marginHorizontal: 15,
        marginVertical: 10,
    },
    divider: {
        marginVertical: 20,
    },
});

export default SettingsScreen;
