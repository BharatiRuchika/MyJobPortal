import React,{useEffect,useState} from 'react'
import { useAlert } from 'react-alert'
import { useDispatch,useSelector } from 'react-redux'
import Loader from "../layouts/loader";
import MetaData from '../layouts/MetaData';
import {Link} from 'react-router-dom';
import {login,clearErrors} from "../../actions/userActions";

const Login = ({history,location}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const alert = useAlert();
    const dispatch = useDispatch();
    const {isAuthenticated,loading,error} = useSelector(state=>state.auth);
    console.log("location",location);
  //   const redirect = location.search ? location.search.split('=')[1] : '/'
  //  console.log("redirect",redirect);
  
    useEffect(() => {
      if(isAuthenticated){
        console.log("im in authenticated");
        // console.log("redirect",redirect)
        history.push("/");
    }
    
      console.log("im in login");
       if(error){
          console.log("error is true",error);
          alert.error(error);
          dispatch(clearErrors());
       }
    }, [dispatch,alert,isAuthenticated,error,history])
    const submitHandler = (e)=>{
     e.preventDefault();
     console.log("im in submit handler");
     console.log(email,password);
     dispatch(login(email,password))
    }
    return (
       <>
        {/* {loading?<Loader/>:( */}
           
            {/* <MetaData title={'Login'}/>
             <div className="row wrapper"> 
		<div style={{alignContent:"center",marginTop:"10%",marginLeft:"25%"}} className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
  
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

    <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
  
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>

            <Link to="/register" className="float-right mt-3">New User?</Link>
          </form>
		  </div>
    </div> */}


<form onSubmit={submitHandler}>
  <div className="mb-3 mt-3">
    <label htmlFor="email" className="form-label">Email:</label>
    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label htmlFor="pwd" className="form-label">Password:</label>
    <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" value={password} onChange={(e)=>setPassword(e.target.value)}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
  </form>
           </>
       
      
    )
}

export default Login