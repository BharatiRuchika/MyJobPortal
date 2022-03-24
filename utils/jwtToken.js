const sendToken = (userDetails,user,type,statusCode,res)=>{
   console.log("im here");
   console.log("user",user);
    const token = user.getJwtToken();
    console.log("date",new Date(Date.now() + 7* 24 * 60 * 60 * 1000));
  const options = {
    expires: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
    }
   
res.status(statusCode).cookie('token', token, options).json({
      success: true,
      token,
      user,
      type,
userDetails

  })

    
}
module.exports = sendToken;
// export default sendToken;