import React, { createContext, useContext } from 'react'
import { useLocalState } from '../util/useLocalStorage'

const UserContext=createContext();

const UserProvider = (props) => {
    const [jwt,setJwt]= useLocalState("","jwt");
    const value ={jwt,setJwt}
    return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
}

function useUser(){
    const context = useContext(UserContext);
    if(context === undefined)
        throw new Error("useUser must be used within userProvider")
    return context;
}   
export {UserProvider,useUser}