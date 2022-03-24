import {GET_JOBS_REQUEST,GET_JOBS_SUCCESS,GET_JOBS_FAIL,CLEAR_ERRORS,GET_MY_JOBS_FAIL,GET_MY_JOBS_REQUEST,JOB_APPLY_REQUEST,JOB_APPLY_SUCCESS,JOB_APPLY_FAIL,GET_MY_JOBS_SUCCESS,GET_APPLICATIONS_REQUEST,GET_APPLICATIONS_SUCCESS,GET_APPLICATIONS_FAIL,GET_JOB_APPLICATIONS_REQUEST,GET_JOB_APPLICATIONS_SUCCESS,GET_JOB_APPLICATIONS_FAIL} from "../constants/jobConstants";
export const myJobsReducer = (state={myjobs:[]},action)=>{
    switch(action.type){
        case GET_MY_JOBS_REQUEST:
       
            return {
                ...state,
               loading:true,
            }
        case GET_MY_JOBS_SUCCESS:
       
         
            return {
                loading:false,
                myjobs:action.payload
            }
        case GET_MY_JOBS_FAIL:
       
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default :
        return state;
    }
}



export const JobsReducer = (state={jobs:[]},action)=>{
    switch(action.type){
      
        case GET_JOBS_REQUEST:
            return {
                ...state,
               loading:true,
            }
       
        case GET_JOBS_SUCCESS:
            console.log("im in get my jobs success");
            console.log("payload",action.payload)
            return {
                loading:false,
                jobs:action.payload
            }
      
        case GET_JOBS_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default :
        return state;
    }
}

export const jobApplyReducer = (state={},action)=>{
    console.log("im in job apply reducer");
    console.log("payload",action.payload);
    switch(action.type){
        case JOB_APPLY_REQUEST:
            return {
                ...state,
                loading:true
            }
        case JOB_APPLY_SUCCESS:
            return {
                loading:false,
                success:action.payload
            }
        case JOB_APPLY_FAIL:
            return {
             
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state;
    }
}


export const ApplicationsReducer = (state={applications:[]},action)=>{
  switch(action.type){
      case GET_APPLICATIONS_REQUEST:
          return {
              ...state,
              loading:true
          }
     case GET_APPLICATIONS_SUCCESS:
         return {
           ...state,
           loading:false,
           applications:action.payload
         }

    case GET_APPLICATIONS_FAIL:
        return {
           ...state,
           loading:false,
           error:action.payload
        }

    case CLEAR_ERRORS:
        return {
            ...state,
            error:null
        }
    default :
    return state;
  }
}


export const jobApplicationsReducer=(state={jobapplications:[]},action)=>{
    console.log("im in jobApplications Reducer")
    switch(action.type){
        case GET_JOB_APPLICATIONS_REQUEST:
            return {
                ...state,
                loading:true
            }
       case GET_JOB_APPLICATIONS_SUCCESS:
           return {
             ...state,
             loading:false,
             jobapplications:action.payload
           }
  
      case GET_JOB_APPLICATIONS_FAIL:
          return {
             ...state,
             loading:false,
             error:action.payload
          }
  
      case CLEAR_ERRORS:
          return {
              ...state,
              error:null
          }
      default :
      return state;
    }
}