import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authReducer} from "./reducers/userReducers";
import { JobsReducer,myJobsReducer,jobApplyReducer,ApplicationsReducer,jobApplicationsReducer } from "./reducers/jobsReducer";
const reducer = combineReducers({
    auth:authReducer,
    jobs:JobsReducer,
    myjobs:myJobsReducer,
    jobApply:jobApplyReducer,
    applications:ApplicationsReducer,
    jobapplications:jobApplicationsReducer
  
  }) 
const middleware = [thunk];
const store = createStore(reducer,composeWithDevTools(applyMiddleware(...middleware)))
export default store;