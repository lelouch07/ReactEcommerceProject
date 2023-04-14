// import { onAuthStateChangedListener}from '../utils/firebase/firebase.utils.js'
import {createContext,useState,useEffect} from 'react'
import { createUserDocumentFromAuth, onAuthStateChangedListener,signOutUser } from '../utils/firebase/firebase.utils';
// import { useSearchParams } from 'react-router-dom';


// as the actual value you want to access
export const UserContext=createContext({
    currentUser:null,
    setCurrentUser:()=>null,
});

export const UserProvider=({children})=>{
const [currentUser,setCurrentUser]=useState(null);
const value ={currentUser,setCurrentUser} ;

// signOutUser();

// useEffect(()=>{
//    const unsubscribe= onAuthStateChangedListener((user)=>{
//     // console.log(user);
//     setCurrentUser(user);
//     if(user)
//     {
//         createUserDocumentFromAuth(user);
//     }
// })
//    return unsubscribe;
// },[]);

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}