const User = require("../Models/users");

//const User = require("../Models/users");
//const Recruiter = require("../Models/Recruiter");
const Recruiter = require("../Models/Recruiter");
//const JobApplicant = require("../Models/JobApplicant");
const JobApplicant = require("../Models/JobApplicant");
//const sendToken = require("../utils/jwtToken");
const sendToken = require("../utils/jwtToken");
exports.registerUser = async(req,res,next)=>{
   try{
       const data = req.body;
       console.log("data",data);
       let user = new User({
           email:data.email,
           password:data.password,
           type:data.type
       })
       await user.save();
       const userDetails = 
       data.type=="recruiter"?
        new Recruiter({
            name:data.name,
           userId:user._id,
            contactNumber: data.contactNumber,
            bio: data.bio,
        }): new JobApplicant({
            name:data.name,
            userId:user._id,
            education: data.education,
            skills: data.skills,
            rating: data.rating,
            resume: data.resume,
            profile: data.profile,
           })
        try{
           await userDetails.save();
        }catch(err){
            console.log("error",error);
            await user.delete();
            res.send(err);
        }
    
    sendToken(userDetails,user,user.type,200,res);
   }catch(err){
     
       console.log("err",err);
       res.send(err);
   }
}

exports.loginUser = async(req,res,next)=>{
     try{
        const {email,password} = req.body;
        console.log(email,password);
        if(!email || !password){
          return next(new ErrorHandler('Please enter email & password', 400))
          }
      const user = await User.findOne({email}).select('+password');
      console.log("user",user);
      if(user==null){
          return next(new ErrorHandler('Invalid Email or Password', 401));
      }
      const isPasswordMatch = await user.comparePassword(password)
      console.log("isPasswordMatch",isPasswordMatch)
      if(!isPasswordMatch){
          return next(new ErrorHandler('Invalid Email or Password', 401));
      }
    //   if(user.type=='recruiter'){
    //   const users = await User.aggregate([
    //       {
    //           $lookup:{
    //             from: "recruiterinfos",
    //             localField: "_id",
    //             foreignField: "userId",
    //             as: "recruiterInfo",
    //           },
    //         }
          
    //   ])
    //   console.log("users",users);
    //   sendToken(users,user.type,200,res);
    // }else{
      sendToken(user,user,user.type,200,res);
    // }
     }catch(err){
         console.log("Err",err);
         res.send(err);
     }
}


exports.Logout = async(req,res,next)=>{
    try{
       
  res.cookie('token',null,{
      expires:new Date(Date.now()),
      httpOnly:true
  });
res.send({
    success:true,
    msg:"logged out"
})
    }catch(err){
        res.send({error:err})
    }
}

