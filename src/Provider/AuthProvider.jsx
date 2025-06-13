import  { createContext, useEffect, useState } from 'react';

import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth"
import app from '../Firebase/Firebase.config';



export const AuthContext = createContext();




export const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading] = useState(true);
  
    const createUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signIn =(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

   const updateUser=(updatedData)=>{
    return updateProfile(auth.currentUser,updatedData)
   }




    const logOut=()=>{
        return signOut(auth)
    }
    useEffect(()=>{
      const unSubscribe = onAuthStateChanged(auth,(currentUser)=>
        {
            setUser(currentUser);
            setLoading(false);
        });
        return()=>{
         unSubscribe()
        }
    },[])

    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        signIn,
        updateUser,
        loading,
        setLoading,
    };

    return<AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
   

};

export default AuthProvider;