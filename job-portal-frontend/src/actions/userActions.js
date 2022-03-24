import apiList from "../components/lib/apiList";
import axios from "axios";
import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,REGISTER_SUCCESS,REGISTER_FAIL,REGISTER_REQUEST,LOGOUT_REQUEST,LOGOUT_SUCCESS,LOGOUT_FAIL,CLEAR_ERRORS} from "../constants/userConstants"

export const login = (email,password)=>async(dispatch)=>{
    console.log("im in login");
   try{
     dispatch({
         type:LOGIN_REQUEST
    })
    const config={
        headers:{
            'Content-Type':'application/json'
        }
      }
// const {data} = await axios.post(apiList.login, {email,password},config);
const {data} = await axios.post("/auth/login",{email,password},config)
console.log("loginuserdata",data);
// localStorage.setItem("token", data.token);
// localStorage.setItem("type", data.user.type);
dispatch({
    type:LOGIN_SUCCESS,
    payload:data.user
})

   }catch(error){
       console.log("im in login catch");
       console.log("error",error.response.data.errMessage);
    dispatch({
        type:LOGIN_FAIL,
        payload:error.response.data.errMessage
    })
   }
}

export const register = (Details)=>async(dispatch)=>{
    console.log("im in register");
    console.log("details",Details);
    try{
      dispatch({
          type:REGISTER_REQUEST
     })
     const config={
         headers:{
             'Content-Type':'application/json'
         }
       }
 const {data} = await axios.post("/auth/register",Details,config)
 console.log("registeruserdata",data);
//  localStorage.setItem("token", data.token);
//  localStorage.setItem("type", data.type);
 dispatch({
     type:REGISTER_SUCCESS,
     payload:data.user
    
 })
 
    }catch(error){
        console.log("im in login catch");
        console.log("error",error.response.data.errMessage);
     dispatch({
         type:REGISTER_FAIL,
         payload:error.response.data.errMessage
     })
    }
}

export const logoutUser = ()=>async(dispatch)=>{
    try{
        console.log("im in logout action");
       
    const {data} = await axios.get('/auth/logout');
    dispatch({
        type:LOGOUT_SUCCESS,
        
    })
}catch(error){
    dispatch({
        type:LOGOUT_FAIL,
        payload:error.response.data.errMessage
    })
}
}
export const clearErrors = ()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
 }