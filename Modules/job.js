
const Job = require("../Models/Jobs");
const Application = require("../Models/application");
var mongoose = require("mongoose");
const Recruiter = require("../Models/Recruiter");
const JobApplicant = require("../Models/JobApplicant");
exports.createJob = async(req,res,next)=>{
    try{
        const user = req.user;
        console.log("user",user);
        if (user.type != "recruiter") {
          res.status(401).json({
            message: "You don't have permissions to add jobs",
          });
          return;
        }
        const data = req.body;
        var job = await Job.create({
          userId: user._id,
          title: data.title,
          maxApplicants: data.maxApplicants,
          maxPositions: data.maxPositions,
          dateOfPosting: data.dateOfPosting,
          deadline: data.deadline,
          skillsets: data.skillsets,
          jobType: data.jobType,
          duration: data.duration,
          salary: data.salary,
          rating: data.rating,
        });
      res.json({ message: "Job added successfully to the database",job });
}catch(err){
        res.send(err);
    }
}


exports.getJobs = async(req,res,next)=>{
   try{
    //  const id = req.params.id;
     let user = req.user;
     console.log("user",user);
     let findParams = {};
     if(user.type=="recruiter"){
      findParams = {
        ...findParams,
        userId: {$ne:user._id},
      };
       var jobs = await Job.aggregate([
         {
          
            $lookup: {
              from: "recruiterinfos",
              localField: "userId",
              foreignField: "userId",
              as: "recruiter",
            },
          },
          { $unwind: "$recruiter" },
          { $match: findParams },
       
      ])
      console.log("jobs",jobs);
     }else{
       console.log("im in else part")
      
      var jobs = await Job.aggregate([
        {
         
           $lookup: {
             from: "recruiterinfos",
             localField: "userId",
             foreignField: "userId",
             as: "recruiter",
           },
          },
           { $unwind: "$recruiter" }
         
        
      ])
     }
     console.log("jobs",jobs);
    //  console.log("id",id);
    //   const jobs = await Job.find({userId:{$ne:id}});
    //   console.log("jobs",jobs);
      res.send({jobs,success:true});
   }catch(err){
     console.log(err);
     res.send({error:err})
   }
}

exports.getMyJobs = async(req,res,next)=>{
  try{
    // const id = req.params.id;
    // console.log("id",id);
    let user = req.user;
    console.log("user",user);
     const jobs = await Job.find({userId:user._id});
     console.log("jobs",jobs);
     res.send({jobs,success:true});
  }catch(err){
    console.log(err);
    res.send({error:err})
  }
}

exports.ApplyJob = async(req,res,next)=>{
  try{
    const user = req.user;
    console.log("user",user);
    const jobId = req.params.id;
    var appliedApplications = await Application.findOne({userId:user._id,jobId:jobId,status: {
      $nin: ["deleted", "accepted", "cancelled"],
    },})
    console.log("appliedApplications",appliedApplications);
    if(appliedApplications!=null){
      res.status(400).json({
        message: "You have already applied for this job",
      });
      return;
    }

   const job = await Job.findOne({ _id: jobId })
      if (job === null) {
        res.status(404).json({
          message: "Job does not exist",
        });
        return;
      }
  const activeApplications = await Application.countDocuments({
      jobId: jobId,
      status: {
        $nin: ["rejected", "deleted", "cancelled", "finished"],
      },
    })
   

if(activeApplications<job.maxApplicants){
  const myActiveApplicationCount = await Application.countDocuments({
    userId: user._id,
    status: {
      $nin: ["rejected", "deleted", "cancelled", "finished"],
    },
  })
  if(myActiveApplicationCount<20){
    const acceptedJobs = await Application.countDocuments({
      userId: user._id,
      status: "accepted",
    })
    if(acceptedJobs==0){
      const application = new Application({
        userId: user._id,
        recruiterId: job.userId,
        jobId: job._id,
        status: "applied",
        
      });
      await application.save();
      res.json({
        message: "Job application successful",
        success:true
      });
    }else{
      res.status(400).json({
          message:
            "You already have an accepted job. Hence you cannot apply.",
        });
      }
  }else{
    res.status(400).json({
      message:
        "You have 20 active applications. Hence you cannot apply.",
    });
  }
}else{
  res.status(400).json({
    message:
      "Application limit reached.",
  });
}

  }catch(error){
    console.log("error",error);
    res.send({error})
  }
}


exports.getApplications = async(req,res,next)=>{
   try{
    const user = req.user;
    console.log("user",user);
    const applications = await Application.aggregate([
      {
        $lookup: {
          from: "jobapplicantinfos",
          localField: "userId",
          foreignField: "userId",
          as: "jobApplicant",
        },
      },
      { $unwind: "$jobApplicant" },
      {
        $lookup: {
          from: "jobs",
          localField: "jobId",
          foreignField: "_id",
          as: "job",
        },
      },
      { $unwind: "$job" },
      {
        $lookup: {
          from: "recruiterinfos",
          localField: "recruiterId",
          foreignField: "userId",
          as: "recruiter",
        },
      },
      { $unwind: "$recruiter" },
      {
        $match: {
          [user.type === "recruiter" ? "recruiterId" : "userId"]: user._id,
        },
      },
    ])
      res.send({applications})
   }catch(error){
    res.status(400).json({
      message:
        "Something went wrong",
    });
   }
}

exports.getJobApplications=async(req,res,next)=>{
  try{
    const user = req.user;
    console.log("im in recruiter");
    var findParams = {
      recruiterId: mongoose.Types.ObjectId(user._id),
    };
    if (req.params.id) {
      findParams = {
        ...findParams,
        jobId: new mongoose.Types.ObjectId(req.params.id),
      };
    }
    if (req.query.status) {
     
        findParams = {
          ...findParams,
          status: req.query.status,
        };
      
    }
    const applications = await Application.aggregate([
      {
          $lookup: {
            from: "jobapplicantinfos",
            localField: "userId",
            foreignField: "userId",
            as: "jobApplicant",
          },
        },
        { $unwind: "$jobApplicant" },
       {
         $lookup: {
            from: "jobs",
            localField: "jobId",
            foreignField: "_id",
            as: "job",
          },
        },
        { $unwind: "$job" },
        { $match: findParams },
      ])
      console.log("applications",applications);
      res.send({applications})
  }catch(error){
    console.log("error",error);
    res.status(400).json({
      message:
        "Something went wrong",
    });
  }
}


exports.updateStatus = async(req,res,next)=>{
  try{
    const user = req.user;
    const id = req.params.id;
    const status = req.body.status;
    if (status === "accepted") {
      const application = await Application.findOne({
        _id: id,
        recruiterId: user._id,
      })
      if(application==null){
        res.status(404).json({
          message: "Application not found",
        });
        return;
      }
    const job = await Job.findOne({
        _id: application.jobId,
        userId: user._id,
      })
      if (job === null) {
        res.status(404).json({
          message: "Job does not exist",
        });
        return;
      }
const activeApplications = await Application.countDocuments({
        recruiterId: user._id,
        jobId: job._id,
        status: "accepted",
      })
      if (activeApplications < job.maxPositions) {
        application.status = status;
        application.dateOfJoining = req.body.dateOfJoining;
        await application.save();
        await Application.updateMany(
          {
            _id: {
              $ne: application._id,
            },
            userId: application.userId,
            status: {
              $nin: [
                "rejected",
                "deleted",
                "cancelled",
                "accepted",
                "finished",
              ],
            },
          },
          {
            $set: {
              status: "cancelled",
            },
          },
          { multi: true }
        )
        if (status === "accepted") {
          await Job.findOneAndUpdate(
            {
              _id: job._id,
              userId: user._id,
            },
            {
              $set: {
                acceptedCandidates: activeApplications + 1,
              },
            }
          )
          res.json({
            message: `Application ${status} successfully`,
          });
        }else{
          res.json({
            message: `Application ${status} successfully`,
          });
        }
       
      }else{
        res.status(400).json({
          message: "All positions for this job are already filled",
        });
      }
    }else{
      await Application.findOneAndUpdate(
        {
          _id: id,
          recruiterId: user._id,
          status: {
            $nin: ["rejected", "deleted", "cancelled"],
          },
        },
        {
          $set: {
            status: status,
          },
        }
      )
      if (status === "finished") {
        res.json({
          message: `Job ${status} successfully`,
        });
      } else {
        res.json({
          message: `Application ${status} successfully`,
        });
      }
    }
  }catch(error){
    // res.status(400).json({
      console.log("Error",error);
     res.json({message:"Something went wrong"}) 
    // });
  }
}

exports.getProfile = async(req,res,next)=>{
  try{
   const user = req.user;
   if (user.type === "recruiter") {
    const recruiter = await Recruiter.findOne({ userId: user._id })
      if (recruiter == null) {
           res.status(404).json({
             message: "User does not exist",
           });
           return;
         }
         res.json(recruiter);
     
   } else {
    const jobApplicant =  await JobApplicant.findOne({ userId: user._id })
      
         if (jobApplicant == null) {
           res.status(404).json({
             message: "User does not exist",
           });
           return;
         }
         res.json(jobApplicant);
      
   }
  }catch(error){
      console.log("Err",error);
      res.send(err);
  }
}