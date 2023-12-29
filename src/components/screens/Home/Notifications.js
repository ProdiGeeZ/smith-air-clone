import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {  IconButton } from 'react-native-paper';

function Notifications() {
    const notifications = [
        { id: 1, message: 'Your shifts have been updated!', time: '10:30 AM', type: 'reminder' },
        { id: 2, message: 'New message from Mike!', time: '9:15 AM', type: 'message' },
        { id: 3, message: 'New message from Terry!', time: '6:00 AM', type: 'message' },
    ];

    const renderIcon = (type) => {
        switch (type) {
            case 'message':
                return 'message-text-outline';
            case 'reminder':
                return 'bell-outline';
            default:
                return 'bell-outline';
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications</Text>
            {notifications.map(notification => (
                <View key={notification.id} style={styles.notification}>
                    <View style={styles.notificationHeader}>
                        <IconButton icon={renderIcon(notification.type)} />
                        <Text style={styles.notificationTime}>{notification.time}</Text>
                    </View>
                    <Text style={styles.notificationMessage}>{notification.message}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    notification: {
        backgroundColor: '#e0e0e0',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    notificationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    notificationTime: {
        fontSize: 12,
        marginLeft: 8,
    },
    notificationMessage: {
        fontSize: 16,
    },
});

export default Notifications;
