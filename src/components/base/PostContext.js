import React, { createContext, useState, useEffect } from 'react';
import { query, ref, onValue, orderByChild, get } from 'firebase/database';
import { FIREBASE_DB } from '../../../firebaseConfig';

// Create the context
export const PostsContext = createContext();

// Provider component
export const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]); posts

    useEffect(() => {
        const postsRef = query(
            ref(FIREBASE_DB, 'posts/'),
            orderByChild('timestamp'),
        );

        const unsubscribePosts = onValue(postsRef, async (snapshot) => {
            const postsData = snapshot.val();
            if (postsData && postsData.posts) {
                const postsWithUserDetails = await Promise.all(postsData.posts.map(async (post) => {
                    const userRef = ref(FIREBASE_DB, `employees/${post.author_id}`);
                    const userSnapshot = await get(userRef);
                    return {
                        ...post,
                        user: userSnapshot.val() || {},
                    };
                }));

                setPosts(postsWithUserDetails);
            }
        });

        return () => unsubscribePosts();
    }, []);

    const handleLike = (postId) => {
        setLikedPosts((currentLikedPosts) => {
            if (currentLikedPosts.includes(postId)) {
                return currentLikedPosts.filter((id) => id !== postId);
            } else {
                return [...currentLikedPosts, postId];
            }
        });

        // Here, you can also add database update logic for likes
    };

    return (
        <PostsContext.Provider value={{ posts, setPosts, likedPosts, setLikedPosts, handleLike }}>
            {children}
        </PostsContext.Provider>
    );
};
