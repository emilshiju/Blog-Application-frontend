import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userInfo:localStorage.getItem('accestoken')?JSON.parse(localStorage.getItem('accestoken')):null,
    // adminInfo:localStorage.getItem('adminInfo')?JSON.parse(localStorage.getItem('adminInfo')):null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUserCredential:(state,action)=>{
            state.userInfo=action.payload.accestoken
           
            localStorage.setItem('accestoken',JSON.stringify(action.payload.accestoken))
        },
        removeUserCredential:(state,action)=>{
            state.userInfo=null
          
            localStorage.removeItem('accestoken')
        }
    }
})


export const {setUserCredential,removeUserCredential}=authSlice.actions

export default authSlice.reducer