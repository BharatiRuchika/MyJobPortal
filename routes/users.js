//var express = require('express');
const  express  = require('express');
var router = express.Router();
// var user = require("../Modules/users");
const {registerUser,loginUser,Logout} = require("../Modules/users")
// import {loginUser} from "../Modules/users.js"
/* GET users listing. */
// const {isAuthenticatedUser} = require("../utils/auth");
router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/logout',Logout);
module.exports = router;
