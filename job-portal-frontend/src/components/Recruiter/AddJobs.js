import React,{useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from '@mui/material/FormControl';
import ChipInput from "material-ui-chip-input";
import axios from "axios";
import { useAlert } from 'react-alert'
import apiList from "../lib/apiList";
import {
    Grid,
    Typography,
    Modal,
    Paper,
    makeStyles,
    TextField,
    MenuItem,
  } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    body: {
      padding: "60px 60px",
    },
    inputBox: {
      width: "400px",
    },
    submitButton: {
      width: "400px",
    },
  }));

const AddJobs = ()=>{
    const classes = useStyles();
    const alert = useAlert();
    const [jobDetails, setJobDetails] = useState({
        title: "",
        maxApplicants: 100,
        maxPositions: 30,
        deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
          .toISOString()
          .substr(0, 16),
        skillsets: [],
        jobType: "Full Time",
        duration: 0,
        salary: 0,
      });

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };
  const submitHandler = async() => {
    console.log("jobdetails",jobDetails);
    const config={
        headers:{
            'Content-Type':'application/json'
        }
      }
    var response = await axios.post(apiList.jobs, jobDetails,config)
    console.log("link",apiList.jobs);
    // const response = await axios.post("/api/jobs",jobDetails,config);
    console.log("response",response);
    console.log("status",response.status);
      if(response.status==200){
        // alert.success("Job Added Successfully");
        alert.success("user registered successfully");
   setJobDetails({
          title: "",
          maxApplicants: 100,
          maxPositions: 30,
          deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 16),
          skillsets: [],
          jobType: "Full Time",
          duration: 0,
          salary: 0,
        });

    }
    }
    return (
        <>
        
     <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: "30px"}}
      >
        <Grid item >
        <Typography variant="h2">Add Job</Typography>
      </Grid>
        <Form>
  <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
    <Form.Label>Job Title</Form.Label>
    <Form.Control type="text"   value={jobDetails.title}
                    onChange={(event) =>
                      handleInput("title", event.target.value)
                    } placeholder="Enter Job Title" />
  
  </Form.Group>
  <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
  <ChipInput
                className={classes.inputBox}
                label="Skills"
                variant="outlined"
                helperText="Press enter to add skills"
                value={jobDetails.skillsets}
                onAdd={(chip) =>
                  setJobDetails({
                    ...jobDetails,
                    skillsets: [...jobDetails.skillsets, chip],
                  })
                }
                onDelete={(chip, index) => {
                  let skillsets = jobDetails.skillsets;
                  skillsets.splice(index, 1);
                  setJobDetails({
                    ...jobDetails,
                    skillsets: skillsets,
                  });
                }}
              />
               </Form.Group><br/>
  <Form.Group className="mb-3 mt-3" controlId="formBasicPassword">
  <TextField
                    select
                    label="Job Type"
                    variant="outlined"
                    value={jobDetails.jobType}
                    onChange={(event) => {
                      handleInput("jobType", event.target.value);
                    }}
                    fullWidth
                  >
                    <MenuItem value="Full Time">Full Time</MenuItem>
                    <MenuItem value="Part Time">Part Time</MenuItem>
                    <MenuItem value="Work From Home">Work From Home</MenuItem>
                  </TextField>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
  <TextField
                    select
                    label="Duration"
                    variant="outlined"
                    value={jobDetails.duration}
                    onChange={(event) => {
                      handleInput("duration", event.target.value);
                    }}
                    fullWidth
                  >
                    <MenuItem value={0}>Flexible</MenuItem>
                    <MenuItem value={1}>1 Month</MenuItem>
                    <MenuItem value={2}>2 Months</MenuItem>
                    <MenuItem value={3}>3 Months</MenuItem>
                    <MenuItem value={4}>4 Months</MenuItem>
                    <MenuItem value={5}>5 Months</MenuItem>
                    <MenuItem value={6}>6 Months</MenuItem>
                  </TextField>
  </Form.Group>
  <Form.Group className="mb-3 mt-3" controlId="formBasicPassword">
  <TextField
                    label="Salary"
                    type="number"
                    variant="outlined"
                    value={jobDetails.salary}
                    onChange={(event) => {
                      handleInput("salary", event.target.value);
                    }}
                    InputProps={{ inputProps: { min: 0 } }}
                    fullWidth
                  /> </Form.Group>
<Form.Group className="mb-3 mt-3" controlId="formBasicPassword">
                  <TextField
                    label="Application Deadline"
                    type="datetime-local"
                    value={jobDetails.deadline}
                    onChange={(event) => {
                      handleInput("deadline", event.target.value);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    fullWidth
                  /></Form.Group>
<Form.Group className="mb-3 mt-3" controlId="formBasicPassword">
<TextField
                    label="Maximum Number Of Applicants"
                    type="number"
                    variant="outlined"
                    value={jobDetails.maxApplicants}
                    onChange={(event) => {
                      handleInput("maxApplicants", event.target.value);
                    }}
                    InputProps={{ inputProps: { min: 1 } }}
                    fullWidth
                  /></Form.Group>
<Form.Group className="mb-3 mt-3" controlId="formBasicPassword">
<TextField
                    label="Positions Available"
                    type="number"
                    variant="outlined"
                    value={jobDetails.maxPositions}
                    onChange={(event) => {
                      handleInput("maxPositions", event.target.value);
                    }}
                    InputProps={{ inputProps: { min: 1 } }}
                    fullWidth
                  />
                  </Form.Group>
                 
  <Button variant="primary" onClick={()=>{submitHandler()}} >
    Submit
  </Button>
</Form></Grid></>
    )
}
export default AddJobs;