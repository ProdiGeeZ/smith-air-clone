/* eslint-disable no-undef */
import React from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { IconButton, Avatar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const Header = () => {
const navigation = useNavigation();
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                <IconButton icon="bell" size={25} />
            </TouchableOpacity>
            <Text style={styles.title}>Smith Air Hub</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                <Avatar.Image size={40} source={require('../../../assets/user.jpg')} style={styles.iconAvatar} />
            </TouchableOpacity>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight || 0,
        paddingHorizontal: 10,
        backgroundColor: '#fff', 
        elevation: 2, 
    },
    title: {
        fontSize: 20, 
        fontWeight: 'bold', 
    },
    iconAvatar: {
        marginRight: 10,
    },
});
