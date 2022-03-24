import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React,{useState,useEffect} from "react";
import {useAlert} from "react-alert";
import Loader from "../layouts/loader";
import MetaData from '../layouts/MetaData';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import {getApplications,clearErrors} from "../../actions/jobActions";

import {Chip} from "@material-ui/core";
const Home = ({history})=>{
  const dispatch = useDispatch();
  const alert = useAlert();
  const {isAuthenticated,user} = useSelector(state=>state.auth);
  const {applications,error,loading} = useSelector(state=>state.applications);
//   const {error:applyError,success} = useSelector(state=>state.jobApply)
  
 useEffect(()=>{
      // if(!isAuthenticated){
      //   history.push("/login");
      // }
      dispatch(getApplications());
      console.log("Applications",applications)
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
    },[dispatch,isAuthenticated,alert,error,history])
    return (
      <>
      {applications.length==0?<h1>No Applications Available</h1>:
      (
        <>
      {applications.map(application=>(
        <Card>
        <Card.Header as="h5">{application.job.title}</Card.Header>
        <Card.Body>
          <Card.Title>Role:{application.job.jobType}</Card.Title>
          <Card.Text>
          <p>Salary:&#8377;{`${application.job.salary} per month`}</p>
         <p> Duration:{application.job.duration!==0?`${application.job.duration} month`:`Flexible`}</p>
         <p> PostedBy:{`${application.recruiter.name}`}</p>
          <p>Applied On:{new Date(application.dateOfApplication).toLocaleDateString()}</p>
         <p> {application.job.skillsets.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }}/>
            ))}</p>
          </Card.Text>
          <Button variant="primary">  {application.status}</Button>
        </Card.Body>
      </Card>))}</>
    )}</> )
    }
export default Home;