import {GET_JOBS_SUCCESS,GET_JOBS_FAIL,GET_JOBS_REQUEST,CLEAR_ERRORS,GET_MY_JOBS_FAIL,GET_MY_JOBS_REQUEST,GET_MY_JOBS_SUCCESS,JOB_APPLY_REQUEST,JOB_APPLY_SUCCESS,JOB_APPLY_FAIL,GET_APPLICATIONS_REQUEST,GET_APPLICATIONS_SUCCESS,GET_APPLICATIONS_FAIL,GET_JOB_APPLICATIONS_REQUEST,GET_JOB_APPLICATIONS_SUCCESS,GET_JOB_APPLICATIONS_FAIL} from "../constants/jobConstants";
import axios from "axios";
export const getJobs = ()=>async(dispatch)=>{
    try{
       
        dispatch({type:GET_JOBS_REQUEST});
        const {data} = await axios.get(`/api/jobs/`);
        console.log("data",data);
        dispatch({
        type:GET_JOBS_SUCCESS,
        payload:data.jobs
        })
    }catch(error){
        dispatch({
            type:GET_JOBS_FAIL,
            payload:error.response.data.errMessage
        })
    }
}

export const getMyJobs = (id)=>async(dispatch)=>{
    try{
    dispatch({type:GET_MY_JOBS_REQUEST})
    const {data} = await axios.get(`/api/myjobs/`);
    console.log("data",data);
    dispatch({
        type:GET_MY_JOBS_SUCCESS,
        payload:data.jobs
    })
}catch(error){
    dispatch({
        type:GET_MY_JOBS_FAIL,
        payload:error.response.data.errMessage
    })
}
}

export const Apply = (jobId)=>async(dispatch)=>{
    try{
      dispatch({type:JOB_APPLY_REQUEST});
      const {data} = await axios.post(`/api/jobs/${jobId}/applications`);
      console.log("data",data);
      dispatch({
          type:JOB_APPLY_SUCCESS,
          payload:data.success
      })
    }catch(error){
        console.log("im in catch");
        console.log("error",error.response);
        dispatch({
            type:JOB_APPLY_FAIL,
            payload:error.response.data.message
        })
    }
}

export const getApplications = ()=>async(dispatch)=>{
    try{
        dispatch({
            type:GET_APPLICATIONS_REQUEST
        })
    const {data} = await axios.get("/api/applications");
    console.log("data",data);   
       dispatch({
           type:GET_APPLICATIONS_SUCCESS,
           payload:data.applications
        })
    }catch(error){
        dispatch({
            type:GET_APPLICATIONS_FAIL,
            payload:error.response.data.message
         })
    }
}

export const getJobApplications=(id)=>async(dispatch)=>{
    console.log("im in get job application action");
    console.log("id",id);
     try{
         dispatch({type:GET_JOB_APPLICATIONS_REQUEST})
         const {data} = await axios.get(`/api/applicants/${id}`);
         console.log("data",data);   
            dispatch({
                type:GET_JOB_APPLICATIONS_SUCCESS,
                payload:data.applications
             })
     }catch(error){
        dispatch({
            type:GET_JOB_APPLICATIONS_FAIL,
            payload:error.response.data.message
         })
     }
}
export const clearErrors = ()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
 }

