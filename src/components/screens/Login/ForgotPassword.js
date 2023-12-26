import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';

const ForgotPassword = () => {
    const [email, setEmail] = React.useState('');

    const handleResetPassword = () => {
        // Logic to handle password reset
    };

    return (
        <View style={styles.container}>
            <Text variant='medium'>Forgot Password</Text>
            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Button mode="contained" onPress={handleResetPassword}>
                Reset Password
            </Button>
        </View>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight || 0 
    },
    logo: {
        width: Dimensions.get('window').width - 150,
        height: 50
    },
    welcomeText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    main: {
        flex: 1,
        paddingTop: 275,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
