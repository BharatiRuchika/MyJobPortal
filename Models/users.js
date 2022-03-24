const mongoose = require("mongoose");
// import mongoose from "mongoose";
const bcrypt = require("bcrypt");
// import bcrypt from "bcrypt"
const crypto = require('crypto')
// import crypto from "crypto"
const jwt = require("jsonwebtoken");
// import jwt from "jsonwebtoken"
let userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        enum:["recruiter","applicant"],
        required:true
    }
})
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},"GUvi!jdks",{
        expiresIn:"7d"
    });
}

userSchema.methods.comparePassword = async function(enteredPassword){
    console.log(this.password);
    console.log(enteredPassword);
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model("User",userSchema,"User");