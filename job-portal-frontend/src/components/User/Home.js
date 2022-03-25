import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React,{useState,useEffect} from "react";
import {useAlert} from "react-alert";
import Loader from "../layouts/loader";
import MetaData from '../layouts/MetaData';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import {clearErrors,getJobs,Apply} from "../../actions/jobActions";

import {Chip} from "@material-ui/core";
const Home = ({history})=>{
  const dispatch = useDispatch();
  const alert = useAlert();
  const {isAuthenticated,user} = useSelector(state=>state.auth);
  const {jobs,error,loading} = useSelector(state=>state.jobs);
  const {error:applyError,success} = useSelector(state=>state.jobApply)
  const handleApply = (jobId)=>{
    console.log("im in handleApply");
    dispatch(Apply(jobId));
  
     
    
  }
 useEffect(()=>{
      // if(!isAuthenticated){
      //   history.push("/login");
      // }
      dispatch(getJobs());
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
      if(success){
        alert.success("You have successfully applied for this job");
      }
      if(applyError){
        console.log("im in error");
        console.log("error",applyError);
        alert.error(applyError);
        dispatch(clearErrors());
      }
      console.log("jobs",jobs);
      console.log("loading",loading);
     
  },[dispatch,error,alert,applyError])
    return (
      <>
      {jobs.length==0?<h1>No Jobs Available</h1>:
      (
        <>
      {jobs.map(job=>(
        <Card>
        <Card.Header as="h5">{job.title}</Card.Header>
        <Card.Body>
          <Card.Title>Role:{job.jobType}</Card.Title>
          <Card.Text>
          <p>Salary:&#8377;{`${job.salary} per month`}</p>
         <p> Duration:{job.duration!==0?`${job.duration} month`:`Flexible`}</p>
         <p> PostedBy:{`${job.recruiter.name}`}</p>
          <p>Application Deadline:{new Date(job.deadline).toLocaleDateString()}</p>
         <p> {job.skillsets.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }}/>
            ))}</p>
          </Card.Text>
          <Button variant="primary" onClick={()=>handleApply(job._id)}>Apply</Button>
        </Card.Body>
      </Card>))}</>
    )}</>
    )}
export default Home;