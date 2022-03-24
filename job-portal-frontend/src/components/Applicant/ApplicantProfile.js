import React from 'react'
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import MetaData from '../layouts/MetaData';
import Loader from "../layouts/loader";
import {useState,useEffect} from "react";
import axios from "axios";
import { Chip} from "@material-ui/core"
const ApplicantProfile = () => {
    const {user,loading} = useSelector(state=>state.auth)
    const [profileDetails, setProfileDetails] = useState({
      name: "",
      education: [],
      skills: [],
      resume: "",
      profile: "",
    });
  
    const [education, setEducation] = useState([
      {
        institutionName: "",
        startYear: "",
        endYear: "",
      },
    ]);
      useEffect(()=>{
          getData();
     },[])
      const getData = async()=>{
        const {data} =  await axios.get('/api/user');
        console.log("data",data);
        setProfileDetails(data);
        if (data.education.length > 0) {
          setEducation(
            data.education.map((edu) => ({
              institutionName: edu.institutionName ? edu.institutionName : "",
              startYear: edu.startYear ? edu.startYear : "",
              endYear: edu.endYear ? edu.endYear : "",
            }))
          );
        }
      }
    return (
       <>
         {loading?<Loader></Loader>:
         <>
          <MetaData title={'Your Profile'}/>  <h2 className="mt-5 ml-10">My Profile</h2>
        <div className="row justify-content-around mt-5 user-info"> 
             {/* <div className="col-12 col-md-3">
               
                <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                    Edit Profile
                </Link>
            </div>  */}
     
            <div className="col-12 col-md-5">
                 <h4>Full Name</h4>
                 <p>{profileDetails.name}</p>
     
                 <h4>Education</h4>
                 {education.map((obj, key) => (
               <>
               <p>College Name:{obj.institutionName}<br/>
               Start Year:{obj.startYear}<br/>
               End Year:{obj.endYear}
               </p>
               </>
                 ))}
                 <h4>Skills</h4>

                 <p> {profileDetails.skills.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }} />
            ))}</p>
                </div> </div>
            </>}
       </>
    )
}

export default ApplicantProfile