const mongoose = require("mongoose");
let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'JobApplicantInfo'
    },
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
     ref:'jobs'
    },
    status: {
      type: String,
      enum: [
        "applied",
        "shortlisted", 
        "accepted",
        "rejected", 
        "deleted", 
        "cancelled", 
        "finished", 
      ],
      default: "applied",
      required: true,
    },
    dateOfApplication: {
      type: Date,
      default: Date.now,
    },
    dateOfJoining: {
      type: Date,
      validate: [
        {
          validator: function (value) {
            return this.dateOfApplication <= value;
          },
          msg: "dateOfJoining should be greater than dateOfApplication",
        },
      ],
    },
},  
);

// schema.virtual("applicationUser", {
//   ref: "JobApplicantInfo",
//   localField: "userId",
//   foreignField: "userId",
//   justOne: true,
// });

// schema.virtual("applicationRecruiter", {
//   ref: "RecruiterInfo",
//   localField: "recruiterId",
//   foreignField: "userId",
//   justOne: true,
// });

// schema.virtual("applicationJob", {
//   ref: "jobs",
//   localField: "jobId",
//   foreignField: "_id",
//   justOne: true,
// });

module.exports = mongoose.model("applications", schema);