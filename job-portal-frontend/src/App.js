import Navbar from "./components/Navbar";
import {Route,Switch,useLocation,Redirect} from "react-router-dom";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Login from "./components/User/Login";
import Register from "./components/User/Signup";
import Home from "./components/User/Home";
import {BrowserRouter} from "react-router-dom";
import AddJobs from "./components/Recruiter/AddJobs";
import MyJobs from "./components/Recruiter/MyJobs"; 
import Welcome from "./components/User/Welcome";
import Application from "./components/Applicant/Applications";
import JobApplications from "./components/Recruiter/JobApplications";
// import Logout from "./components/Logout";
import AcceptedApplicants from "./components/Recruiter/AcceptedApplicants";
import ApplicantProfile from "./components/Applicant/ApplicantProfile"
import Profile from "./components/Recruiter/Profile";
import { createContext, useState } from "react";
export const SetPopupContext = createContext();
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Route path="/" exact component={Welcome}/>
      <Route path="/home" exact component={Home}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <ProtectedRoute path="/addjobs" exact component={AddJobs}/>
      <ProtectedRoute path="/myjobs" exact component={MyJobs}/>
    
      <ProtectedRoute path="/applications" exact component={Application}/>
      <ProtectedRoute path="/applicantprofile" exact component={ApplicantProfile}/>
      
      <ProtectedRoute path="/profile" exact component={Profile}/>
<ProtectedRoute path="/applications/:id" exact component={JobApplications}/>
<ProtectedRoute exact path="/employees">
                <AcceptedApplicants />
              </ProtectedRoute>

      </BrowserRouter>
  );
}

export default App;
