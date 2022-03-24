const mongoose = require("mongoose");
// import mongoose from "mongoose";
const jwt = require("jsonwebtoken");
// import jwt from "jsonwebtoken"
let recruiterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return v !== "" ? /\+\d{1,3}\d{10}/.test(v) : true;
        },
        msg: "Phone number is invalid!",
      },
    },
    bio: {
      type: String,
    },
  },
  { collation: { locale: "en" } }
);

recruiterSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},"GUvi!jdks",{
        expiresIn:"7d"
    });
}
module.exports  = mongoose.model("RecruiterInfo", recruiterSchema);