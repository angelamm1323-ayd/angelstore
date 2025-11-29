// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBr7M8PAMuuOlY0npGrKnGc0OhJPJPNK9E",
    authDomain: "angelstore-4dca8.firebaseapp.com",
    projectId: "angelstore-4dca8",
    storageBucket: "angelstore-4dca8.firebasestorage.app",
    messagingSenderId: "608369684468",
    appId: "1:608369684468:web:0d0977a937b6d0b36613a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Auth functions
export const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = () => {
    return firebaseSignOut(auth);
};

export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};

export {
    app,
    db,
    auth
};