// import { onAuthStateChangedListener}from '../utils/firebase/firebase.utils.js'
import {createContext,useState} from 'react'
// import { createUserDocumentFromAuth, onAuthStateChangedListener,signOutUser } from '../utils/firebase/firebase.utils';
// import { useSearchParams } from 'react-router-dom';


// as the actual value you want to access
export const UserContext=createContext({
    currentUser:null,
    setCurrentUser:()=>null,
});

export const UserProvider=({children})=>{
const [currentUser,setCurrentUser]=useState(null);
const value ={currentUser,setCurrentUser} ;

const userReducer=(state,action)=>{
    const {type,payload}=action;

    switch(type){
        case 'SET_CURRENT_USER':
            return {currentUser:payload}
        default:
            throw new Error(`Unhandled type ${type} in userReducer`)
        case 'increment':
            return  { value:state.value+1}
    }
}
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