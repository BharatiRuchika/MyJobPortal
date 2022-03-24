import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,REGISTER_REQUEST,REGISTER_FAIL,REGISTER_SUCCESS,LOGOUT_REQUEST,LOGOUT_SUCCESS,LOGOUT_FAIL,CLEAR_ERRORS} from "../constants/userConstants"

export const authReducer = (state={user:{}},action)=>{
    switch(action.type){
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
         console.log("im in load user request");
            return {
                ...state,
                loading:true,
                isAuthenticated:false
            }
        case REGISTER_SUCCESS:
           
        case LOGIN_SUCCESS:
            console.log("im in register success");
              console.log("user",action.payload);
            return {
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload
            }
        case LOGOUT_SUCCESS:
                return {
                  loading:false,
                  isAuthenticated: false,
                  user : null,
              }
              case LOGOUT_FAIL:
                return {
                  ...state,
                  error: action.payload
                }
         case LOGIN_FAIL:
         case REGISTER_FAIL:
          console.log("im in login fail");
          console.log(action.payload);
             return {
              ...state,
              loading:false,
              isAuthenticated:false,
              user:null,
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
  

//   export const logoutReducer = (state={user:{}},action)=>{
//       switch(action.type){
//     case LOGOUT_SUCCESS:
//         console.log("im in lgout success reducer");
//         return {
//           loading:false,
//           isAuthenticated: false,
//           user : null,

//       }
//       case LOGOUT_FAIL:
//         return {
//           ...state,
//           error: action.payload
//         }
//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 error:null
//             }
//         default:
//             return state;
//     }
//   }