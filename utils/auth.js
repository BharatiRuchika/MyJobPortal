//check if user is authenticated or not
const User = require("../Models/users");
const jwt = require("jsonwebtoken");
exports.isAuthenticatedUser =async(req,res,next)=>{
    try{
    console.log("im in authenticated user");
    console.log("cookies",req.cookies);
   const {token} = req.cookies;
   console.log("token",token);
//    if(!token){
//        console.log("im in token unfefines");
//        return next(new ErrorHandler('You have to login first to access this resource', 401));
//     }
   const decoded = jwt.verify(token,"GUvi!jdks");
   console.log("id",decoded.id);
   req.user = await User.findById(decoded.id);
   console.log("user",req.user);
   next();
    }catch(err){
        console.log("err",err);
    }
}
//ha