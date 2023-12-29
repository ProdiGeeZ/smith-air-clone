import React, { useContext } from 'react';
import { ScrollView, RefreshControl, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Title, Card, Paragraph, Text, Avatar, IconButton } from 'react-native-paper';
import moment from 'moment';
import PulsingGradient from '../../base/PulsingGradient';
import { PostsContext } from '../../base/PostContext'; 

const LatestPosts = () => {
    const { posts, likedPosts, handleLike } = useContext(PostsContext);
    const [refreshing, setRefreshing] = React.useState(false);

    const formattedPosts = posts.sort((a, b) => b.timestamp - a.timestamp);

    const onRefresh = React.useCallback(() => {
        // Instead of directly calling fetchPosts here, you might want to trigger a refresh in the context
        // For example, you might have a refreshPosts function in your context that you could call here
        setRefreshing(true);
        //fetchPosts();
        setTimeout(() => {
            setRefreshing(false);
        }, 2500);
    }, []);

    return (
        <>
            <PulsingGradient refreshing={refreshing} />
            <ScrollView style={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <Title style={styles.header}>Latest Posts</Title>
                {formattedPosts.map((post) => (
                    <Card key={post.post_id} style={styles.postContainer}>
                        <View style={styles.postHeader}>
                            <TouchableOpacity onPress={() => console.log('User avatar pressed')}>
                                <Avatar.Image source={{ uri: post.user.profile_avatar }} size={40} style={styles.avatar} />
                            </TouchableOpacity>
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>{post.user.employee_name}</Text>
                                <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                            </View>
                        </View>
                        <Image source={{ uri: post.image }} style={styles.postImage} />
                        <View style={styles.postDetails}>
                            <Title style={styles.postTitle}>{post.title}</Title>
                            <View style={styles.interactionsRow}>
                                <TouchableOpacity style={styles.interactionButton} onPress={() => handleLike(post.post_id)}>
                                    <IconButton
                                        icon="heart"
                                        iconColor={likedPosts.includes(post.post_id) ? 'red' : '#000'}
                                        size={25}
                                    />
                                    <Text style={styles.interactionText}>{likedPosts.includes(post.post_id) ? (post.likes || 0) + 1 : post.likes || 0}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.interactionButton} onPress={() => console.log('Comment')}>
                                    <IconButton icon="comment" color={'#000'} size={25} />
                                    <Text style={styles.interactionText}>15</Text> 
                                </TouchableOpacity>
                            </View>
                            <Paragraph style={styles.postContent}>{post.body}</Paragraph>
                        </View>
                    </Card>
                ))}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    header: {
        fontSize: 24,
        color: '#000',
        padding: 15,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',
    },
    postContainer: {
        marginVertical: 8,
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    avatar: {
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontWeight: 'bold',
    },
    timestamp: {
        fontSize: 12,
        color: '#666',
    },
    postImage: {
        width: '100%',
        height: 400,
    },
    postDetails: {
        padding: 15,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 0,
    },
    postContent: {
        fontSize: 14,
    },
    interactionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
    },
    interactionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    interactionText: {
        fontSize: 14,
        marginLeft: 5,
    },
});

export default LatestPosts;