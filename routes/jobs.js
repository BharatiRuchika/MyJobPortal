// var express = require('express');
const express = require("express");
var router = express.Router();
const {createJob,getJobs,getMyJobs,ApplyJob,getApplications,getJobApplications,updateStatus,getProfile} = require("../Modules/job");

const {isAuthenticatedUser} = require("../utils/auth");

router.post('/jobs',isAuthenticatedUser,createJob);
router.get('/jobs',isAuthenticatedUser,getJobs);
router.get('/myjobs',isAuthenticatedUser,getMyJobs);
router.post('/jobs/:id/applications',isAuthenticatedUser,ApplyJob)
router.get("/applications",isAuthenticatedUser,getApplications)
router.get("/applicants/:id",isAuthenticatedUser,getJobApplications)
router.get("/applicants",isAuthenticatedUser,getJobApplications)
router.put("/applications/:id",isAuthenticatedUser,updateStatus)
router.get('/user',isAuthenticatedUser,getProfile);
module.exports = router;
