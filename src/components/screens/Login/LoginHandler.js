import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { FIREBASE_AUTH } from '../../../../firebaseConfig';

const LoginHandler = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const auth = FIREBASE_AUTH;

    const handleSubmit = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                const user = userCredentials.user;
                console.log('Logged in with:', user.email);
            })
            .catch((err) => {
                const msg = err.message;
                alert(`Sign in failed: ${msg}`);
            });
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                label="Email"
                value={email}
                onChangeText={email => setEmail(email.trim())}
                activeOutlineColor={'blue'}
                mode="outlined elevated"
                style={styles.inputFields}
                theme={{ colors: { primary: '#003bab', underlineColor: 'transparent' } }}
            />
            <TextInput
                label="Password"
                value={password}
                secureTextEntry
                onChangeText={password => setPassword(password.trim())}
                activeOutlineColor={'blue'}
                mode="outlined elevated"
                style={styles.inputFields}
                theme={{ colors: { primary: '#003bab', underlineColor: 'transparent' } }}
            />
            <View style={styles.buttonContainer}>
                <Button mode="elevated" onPress={handleSubmit} style={styles.submitButton} textColor="white">
                    Log in
                </Button>
            </View>
        </View>
    );
};

export default LoginHandler;

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 20,
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
    }
});