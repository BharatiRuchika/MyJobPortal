import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import React,{useState,useEffect} from "react";
import {useAlert} from "react-alert";
import Loader from "../layouts/loader";
import MetaData from '../layouts/MetaData';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import {clearErrors,getMyJobs} from "../../actions/jobActions";
import {Chip} from "@material-ui/core";
const MyJobs = ({history})=>{
  const dispatch = useDispatch();
  const alert = useAlert();
  const {isAuthenticated,user} = useSelector(state=>state.auth);
  const {myjobs,error,loading} = useSelector(state=>state.myjobs);
 const viewApplications = (jobId)=>{
   history.push(`applications/${jobId}`)
 }
  useEffect(()=>{
      // if(!isAuthenticated){
      //   history.push("/login");
      // }
      dispatch(getMyJobs());
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      }
      console.log("jobs",myjobs);
      console.log("loading",loading);
  },[dispatch,isAuthenticated,error,alert])
    return (
      <>
      {myjobs.length==0?<h1>No Jobs Added</h1>:(
          <>
      {myjobs.map(job=>
     

      (
        
         <Card>
        <Card.Header as="h5">{job.title}</Card.Header>
        <Card.Body>
          <Card.Title>Role:{job.jobType}</Card.Title>
          <Card.Text>
          <p>Salary:&#8377;{`${job.salary} per month`}</p>
         <p> Duration:{job.duration!==0?`${job.duration} month`:`Flexible`}</p>
       
          <p>Application Deadline:{new Date(job.deadline).toLocaleDateString()}</p>
         <p> {job.skillsets.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }}/>
            ))}</p>
          </Card.Text>
          <Button variant="primary" onClick={()=>viewApplications(job._id)}>View Applications</Button>
        </Card.Body>
      </Card>))}</>
    )
}</>)}
export default MyJobs;