// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
import express from "express";
var router = express.Router();
import {uploadResume} from '../Modules/upload.js';
import multer from "multer";
// import multer from "multer"
const upload = multer();
router.post('/resume', upload.single("file"),uploadResume);

export default router;