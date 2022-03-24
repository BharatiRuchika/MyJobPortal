import { useState, useEffect, useContext } from "react";
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
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAlert } from 'react-alert'
import apiList, { server } from "../lib/apiList";
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
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
}));



const ApplicationTile = (props) => {
  const classes = useStyles();
  console.log("props",props);
  const alert = useAlert();
  const { application, getData } = props;
  const [open, setOpen] = useState(false);
  const [openEndJob, setOpenEndJob] = useState(false);
  
const appliedOn = new Date(application.dateOfApplication);
const handleCloseEndJob = () => {
    setOpenEndJob(false);
  };

  const colorSet = {
    applied: "#3454D1",
    shortlisted: "#DC851F",
    accepted: "#09BC8A",
    rejected: "#D1345B",
    deleted: "#B49A67",
    cancelled: "#FF8484",
    finished: "#4EA5D9",
  };

  const updateStatus = async(status) => {

    const statusData = {
      status: status,
      dateOfJoining: new Date().toISOString(),
    };
    var {data} =  await axios.put(`/api/applications/${application._id}`, statusData)
          console.log("data",data);
          alert.success(data.message);
    handleCloseEndJob();
    getData();
}

  return (
    <Paper className={classes.jobTileOuter} elevation={3}>
      <Grid container>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
         
        </Grid>
        <Grid container item xs={7} spacing={1} direction="column">
          <Grid item>
            <Typography variant="h5">
              {application.jobApplicant.name}
            </Typography>
          </Grid>
          
          <Grid item>Job Title: {application.job.title}</Grid>
          <Grid item>Role: {application.job.jobType}</Grid>
          <Grid item>Applied On: {appliedOn.toLocaleDateString()}</Grid>
         
          <Grid item>
            {application.jobApplicant.skills.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }} />
            ))}
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={3}>
          
          <Grid item container xs>
            {/* {buttonSet[application.status]} */}
            <Button
              variant="contained"
              color="primary"
              className={classes.statusBlock}
              style={{
                background: "#09BC8A",
              }}
              onClick={() => {
                setOpenEndJob(true);
              }}
            >
              End Job
            </Button>
          </Grid>
         
        </Grid>
      </Grid>
    
      <Modal
        open={openEndJob}
        onClose={handleCloseEndJob}
        className={classes.popupDialog}
      >
        <Paper
          style={{
            padding: "20px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "30%",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            Are you sure?
          </Typography>
          <Grid container justify="center" spacing={5}>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                style={{ padding: "10px 50px" }}
                onClick={() => {
                  updateStatus("finished");
                }}
              >
                Yes
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 50px" }}
                onClick={() => handleCloseEndJob()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </Paper>
  );
};

const AcceptedApplicants = (props) => {
 
  const [applications, setApplications] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOptions, setSearchOptions] = useState({
    
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async() => {
    let searchParams = [];
    searchParams = [...searchParams, `status=accepted`];
const queryString = searchParams.join("&");
    console.log(queryString);
    // await axios.get(`/api/applicants/${id}`);
    let address = `/api/applicants`;
    if (queryString !== "") {
      address = `/api/applicants?${queryString}`;
    }
console.log(address);
var {data} = await axios.get(address)
console.log("data",data)
     setApplications(data.applications);
    };

  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: "30px", minHeight: "93vh" }}
      >
        <Grid item>
          <Typography variant="h2">Employees</Typography>
        </Grid>
        
        <Grid
          container
          item
          xs
          direction="column"
          style={{ width: "100%" }}
          alignItems="stretch"
          justify="center"
        >
          {applications.length > 0 ? (
            applications.map((obj) => (
              <Grid item>
                {/* {console.log(obj)} */}
                <ApplicationTile application={obj} getData={getData} />
              </Grid>
            ))
          ) : (
            <Typography variant="h5" style={{ textAlign: "center" }}>
              No Applications Found
            </Typography>
          )}
        </Grid>
      </Grid>
      
    </>
  );
};

export default AcceptedApplicants;