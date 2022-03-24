const { v4: uuidv4 } = require("uuid");
const { promisify } = require("util");
const fs = require("fs");
const pipeline = promisify(require("stream").pipeline);


export const uploadResume = async(req,res)=>{
    try{
       const {file} = req;
       console.log("file",file.stream);
       if (file.mimetype != "application/pdf") {
        res.status(400).json({
          message: "Invalid format",
        });
    }else{
        console.log("im in else part")
        console.log(`${__dirname}`);
        console.log("filename",`${uuidv4()}${file.detectedFileExtension}`)
        const filename = `${uuidv4()}${file.detectedFileExtension}`;
        pipeline(
            file.stream,
            fs.createWriteStream(`${__dirname}/../public/resume/${filename}`)
          )
            .then(() => {
                console.log("file uploaded successfully");
              res.send({
                message: "File uploaded successfully",
                url: `/host/resume/${filename}`,
              });
            })
            .catch((err) => {
                console.log("err",err);
              res.status(400).json({
                message: "Error while uploading",
              });
            });
    }
    }catch(error){
        console.log("error",error);
    }
}