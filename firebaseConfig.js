import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBXjqB6eGGEfjdLBPiDfJD4OXuNdzsqZKU",
    authDomain: "smith-air-clone.firebaseapp.com",
    projectId: "smith-air-clone",
    storageBucket: "smith-air-clone.appspot.com",
    messagingSenderId: "475590570831",
    appId: "1:475590570831:web:ce3bd3223b0154df7d4b3a"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = (() => {
    try {
        return initializeAuth(FIREBASE_APP, {
            persistence: getReactNativePersistence(AsyncStorage)
        });
    } catch (error) {
        if (error.code === 'auth/already-initialized') {
            return getAuth(FIREBASE_APP);
        } else {
            throw error;
        }
    }
})();


