import { Navbar,Container,Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import {logoutUser,clearErrors} from "../actions/userActions";
const TopNavbar =(props)=>{
  const dispatch = useDispatch();
    const {isAuthenticated,user} = useSelector(state=>state.auth);
    console.log("user",user);
    const logoutHandler = ()=>{
      dispatch(logoutUser());
     alert.success("Logged out Successfully...");
    }

    return(
        
         <Navbar bg="dark" variant="dark">
    <Container>
   
    <Link to="/" style={{color:"white"}} id="view_btn" className="btn btn-block">Job Portal</Link>
    {isAuthenticated?(
      user.type=="recruiter"?(
        <>
       <Nav className="justify-content-end flex-grow-2">
    
    <Link to="/home" style={{color:"white"}} id="view_btn" className="btn btn-block">Home</Link>
    <Link to="/addjobs" style={{color:"white"}} id="view_btn" className="btn btn-block">AddJobs</Link>
    <Link to="/myjobs" style={{color:"white"}} id="view_btn" className="btn btn-block">MyJobs</Link>
    <Link to="/employees" style={{color:"white"}} id="view_btn" className="btn btn-block">Employees</Link>
    <Link to="/profile" style={{color:"white"}} id="view_btn" className="btn btn-block">Profile</Link>
    <Link style={{color:"white"}} id="view_btn" className="btn btn-block" onClick={logoutHandler} to="/">Logout</Link>

  </Nav></>):(
    <>
     <Nav className="justify-content-end flex-grow-2">
    <Link to="/home" style={{color:"white"}} id="view_btn" className="btn btn-block">Home</Link>
     <Link to="/applications" style={{color:"white"}} id="view_btn" className="btn btn-block">Applications</Link>
     <Link to="/applicantprofile" style={{color:"white"}} id="view_btn" className="btn btn-block">Profile</Link>
     <Link style={{color:"white"}} id="view_btn" className="btn btn-block" onClick={logoutHandler} to="/">Logout</Link>
    </Nav></>
  )):(
    <>
    <Nav className="justify-content-end flex-grow-2">
    
      <Link to="/login" style={{color:"white"}} id="view_btn" className="btn btn-block">LOGIN</Link>
      <Link to="/register" style={{color:"white"}} id="view_btn" className="btn btn-block">SIGNUP</Link>
     
    </Nav></>)}
    </Container>
  </Navbar>



        
    )
}
export default TopNavbar;