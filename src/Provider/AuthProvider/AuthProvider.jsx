import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, isFirebaseConfigured } from "../../Firebase/Firebase.config";
import { AuthContext } from "../AuthContext/AuthContext";

const googleProvider = new GoogleAuthProvider();
const firebaseConfigError = new Error(
  "Firebase is not configured. Add Firebase environment variables in Vercel and redeploy."
);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured && Boolean(auth));

  // Create User With MailPass
  const createUser = (email, password) => {
    setLoading(true);
    if (!auth) {
      setLoading(false);
      return Promise.reject(firebaseConfigError);
    }
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in with mail pass
  const signInWithMailPass = (email, password) => {
    if (!auth) {
      return Promise.reject(firebaseConfigError);
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign In Google
  const signInGoogle = () => {
    if (!auth) {
      return Promise.reject(firebaseConfigError);
    }
    return signInWithPopup(auth, googleProvider);
  };

  // Password Reset Password
  const resetPassword = (email) => {
    if (!auth) {
      return Promise.reject(firebaseConfigError);
    }
    return sendPasswordResetEmail(auth, email);
  };

  // Sign Out
  const signOutUser = () => {
    setLoading(true);
    if (!auth) {
      setLoading(false);
      return Promise.resolve();
    }
    return signOut(auth);
  };

  // Manage User State
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      return undefined;
    }

    const unSubscribe = onAuthStateChanged(auth, (res) => {
      setUser(res);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  //   value User Info
  const userInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signInWithMailPass,
    resetPassword,
    signOutUser,
    signInGoogle,
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
