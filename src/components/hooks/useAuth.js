

import React from "react";
import {proxy,useSnapshot} from 'valtio'

function getAuthUser(){
    const jwt=window.localStorage.getItem('jwtToken');
    if(!jwt) return {};

    return JSON.parse(atob(jwt))
}
const state=proxy(
    {
        useAuth:getAuthUser(),
    },
    {
        isAuth:true
    }
);
const actions={
    login:(user)=>{
        console.log('login',{user});
        state.authUser=user;
        window.localStorage.setItem('jwtToken',btoa(JSON.stringify(state.authUser)))
    },
    logout:()=>{
        state.authUser={};
        window.localStorage.removeItem('jwtToken');
    }
};
//proxy object : tells the comp that something is changed and rerenders

function useAuth(){
    const snap=useSnapshot(state);
    console.log('snap',{snap})
    return{
        ...snap,
        ...actions
    }
}

export default useAuth;