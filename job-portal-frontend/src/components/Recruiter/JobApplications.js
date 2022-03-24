import {useAlert} from "react-alert";
import Loader from "../layouts/loader";
import MetaData from '../layouts/MetaData';
import {Link} from 'react-router-dom';
import React,{useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import Card from 'react-bootstrap/Card';
import {clearErrors,getJobApplications} from "../../actions/jobActions";
import { jobApplicationsReducer } from "../../reducers/jobsReducer";
import { useParams } from "react-router";
import { useSelect } from "@mui/base";
import axios from "axios";
import {
    Button,
    Chip,
    Grid,
    IconButton,
    InputAdornment,
    makeStyles,
    Paper,
    TextField,
    Typography,
    Modal,
    Slider,
    FormControlLabel,
    FormGroup,
    MenuItem,
    Checkbox,
    Avatar,
  } from "@material-ui/core";
  const useStyles = makeStyles((theme) => ({
    body: {
      height: "inherit",
    },
    statusBlock: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textTransform: "uppercase",
    },
    jobTileOuter: {
      padding: "30px",
      margin: "20px 0",
      boxSizing: "border-box",
      width: "100%",
    },
}))
const JobApplications = ({history})=>{
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    const classes = useStyles();
    const {isAuthenticated,user} = useSelector(state=>state.auth);
const {jobapplications,error} = useSelector(state=>state.jobapplications)
const colorSet = {
    applied: "#3454D1",
    shortlisted: "#DC851F",
    accepted: "#09BC8A",
    rejected: "#D1345B",
    deleted: "#B49A67",
    cancelled: "#FF8484",
    finished: "#4EA5D9",
  };
    useEffect(()=>{
      getData();
        // var jobId = params.id;
        // console.log("jobid",jobId);
        // dispatch(getJobApplications(jobId));
        // console.log("jobapplications",jobapplications)
        // if(error){
        //     alert.error(error);
        //     dispatch(clearErrors());
        //   }
    },[dispatch,isAuthenticated,error,alert,history])
const getData = ()=>{
        var jobId = params.id;
        console.log("jobid",jobId);
        dispatch(getJobApplications(jobId));
        console.log("jobapplications",jobapplications)
        if(error){
            alert.error(error);
            dispatch(clearErrors());
          }
}
    const updateStatus = async(status,id) => {
        console.log("sttatus",id);
        // const address = `${apiList.applications}/${application._id}`;
        const statusData = {
          status: status,
          dateOfJoining: new Date().toISOString(),
        };
var {data} =  await axios.put(`/api/applications/${id}`, statusData)
          console.log("data",data);
          alert.success(data.message);
          getData();
      };
      return(
        <>
        {jobapplications.length==0?<h1>No Applicants Available</h1>:(
          <>
      {jobapplications.map(application=>
     

      (
        <>
         <Card>
        <Card.Header as="h5">{application.jobApplicant.name}</Card.Header>
        <Card.Body>
          <Card.Title>Applied On:{new Date(application.dateOfApplication).toLocaleDateString()}</Card.Title>
          <Card.Text>
          <p>

          Education:{" "}
            {application.jobApplicant.education
              .map((edu) => {
                return `${edu.institutionName} (${edu.startYear}-${
                  edu.endYear ? edu.endYear : "Ongoing"
                })`;
              })
              .join(", ")}
          </p>
         <p> {application.job.skillsets.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }}/>
            ))}</p>
          <>  
{application.status=="applied"?
<>
    <Grid item xs>
          <Button
            className={classes.statusBlock}
            style={{
              background: colorSet["shortlisted"],
              color: "#ffffff",
            }}
            onClick={() => updateStatus("shortlisted",application._id)}
          >
            Shortlist
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            className={classes.statusBlock}
            style={{
              background: colorSet["rejected"],
              color: "#ffffff",
            }}
            onClick={() => updateStatus("rejected")}
          >
            Reject
          </Button>
        </Grid>
</>:application.status=="shortlisted"?<>
  <Grid item xs>
          <Button
            className={classes.statusBlock}
            style={{
              background: colorSet["accepted"],
              color: "#ffffff",
            }}
            onClick={() => updateStatus("accepted",application._id)}
          >
            Accept
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            className={classes.statusBlock}
            style={{
              background: colorSet["rejected"],
              color: "#ffffff",
            }}
            onClick={() => updateStatus("rejected",application._id)}
          >
            Reject
          </Button>
        </Grid>
</>:application.status=="rejected"?<>
  <Grid item xs>
          <Paper
            className={classes.statusBlock}
            style={{
              background: colorSet["rejected"],
              color: "#ffffff",
            }}
          >
            Rejected
          </Paper>
        </Grid>
</>:
application.status=="accepted"?<>
  <Grid item xs>
          <Paper
            className={classes.statusBlock}
            style={{
              background: colorSet["accepted"],
              color: "#ffffff",
            }}
          >
            Accepted
          </Paper>
        </Grid>
</>:
application.status=="cancelled"?<>
  <Grid item xs>
          <Paper
            className={classes.statusBlock}
            style={{
              background: colorSet["cancelled"],
              color: "#ffffff",
            }}
          >
            Cancelled
          </Paper>
        </Grid>
</>:<>
  <Grid item xs>
          <Paper
            className={classes.statusBlock}
            style={{
              background: colorSet["finished"],
              color: "#ffffff",
            }}
          >
            Finished
          </Paper>
        </Grid>
</>}

</>
</Card.Text>

        </Card.Body>
      </Card>
     
        </>
    ))}</>)}</>)
}

      
export default JobApplications;