import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail} from "firebase/auth";

const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const LoginWithEmailAndPass = async (email, password) => {
    try{
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const Logout = async () => {
    try{
      const result = await auth.signOut();
      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  };

  const CreateUser = async (email, password) => {
    try{
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const SendEmailVerification = async () => {
    try{
      const result = await sendEmailVerification(auth.currentUser)
      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const sendPassRecoveryEmail = async(email) => {
    try{
      const result = await sendPasswordResetEmail(auth, email)
      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, LoginWithEmailAndPass, Logout, CreateUser, SendEmailVerification, sendPassRecoveryEmail }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContextProvider, useAuth };
