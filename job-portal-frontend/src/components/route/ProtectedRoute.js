import React from 'react'
import {Route,Redirect} from "react-router-dom";
import { useSelector } from 'react-redux';
// import loader from 'sass-loader';
const ProtectedRoute = ({component:Component,...rest}) => {
    const {isAuthenticated,user,loading} = useSelector(state=>state.auth);
    console.log("im in protected route");
    console.log("isAuthenticated",isAuthenticated);
    
    console.log("loading",loading);
    return (
       <>
       {loading===false && (<>
        <Route {...rest} render={
            props=>{
                if(isAuthenticated===false){
                    return <Redirect to="/login"></Redirect>
                }
               
                return <Component {...props}/>

            }
        }></Route>
       </>)}
       </>)
}

export default ProtectedRoute