// import { useEffect, useContext } from "react";
// import { Redirect } from "react-router-dom";
// import { useAlert } from 'react-alert'
// import { useDispatch,useSelector } from 'react-redux'
// import {logout,clearErrors} from "../actions/userActions";
// const Logout = ({history}) => {
//     const dispatch = useDispatch();
//     const alert = useAlert();
//     useEffect(() => {
//     dispatch(logout())
//     alert.success("Logged out Successfully...");

//   }, [history,dispatch,alert]);
//   return <Redirect to="/login" />;
// };

// export default Logout;