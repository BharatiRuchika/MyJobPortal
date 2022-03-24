import React from 'react'
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import MetaData from '../layouts/MetaData';
import Loader from "../layouts/loader";
import {useState,useEffect} from "react";
import axios from "axios";
const Profile = () => {
    const {user,loading} = useSelector(state=>state.auth)
    const [profileDetails, setProfileDetails] = useState({
        name: "",
        bio: "",
        contactNumber: "",
      });
      const [phone, setPhone] = useState("");
      useEffect(()=>{
          getData();
     },[])
      const getData = async()=>{
        const {data} =  await axios.get('/api/user');
        console.log("data",data);
        setProfileDetails(data);
        setPhone(data.contactNumber);
      }
    return (
       <>
         {loading?<Loader></Loader>:
         <>
          <MetaData title={'Your Profile'}/>  <h2 className="mt-5 ml-5">My Profile</h2>
        <div className="row justify-content-around mt-5 user-info"> 
             <div className="col-12 col-md-3">
               
                <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                    Edit Profile
                </Link>
            </div> 
     
            <div className="col-12 col-md-5">
                 <h4>Full Name</h4>
                 <p>{profileDetails.name}</p>
     
                 <h4>Bio</h4>
                 <p>{profileDetails.bio}</p>
                 <h4>Contact Number</h4>
                 <p>{phone}</p>
                </div> </div>
            </>}
       </>
    )
}

export default Profile