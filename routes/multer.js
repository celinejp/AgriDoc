const Grid = require("gridfs-stream");
const multer = require("multer");
const express = require("express");
const router = express.Router();
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require("mongoose");
require("dotenv").config();

let gfs, gridfsBucket;

mongoose.connection.once("open", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connections[0].db, {
      bucketName: 'uploads'
    });
  
    gfs = Grid(mongoose.connections[0].db, mongoose.mongo);
    gfs.collection("uploads");
  
    console.log("Connected...");
  }).on("error", function (error) {
    console.log("error is:", error);
  });

  const storage = new GridFsStorage({
    url: process.env.DATABASE_URL,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
  
        const filename = `${file.originalname}_${Date.now()}`
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
  
      });
    }
  });
  
  const upload = multer({
    storage: storage
  });
  
// router.use("/api/images", express.static("uploads/images"))

  // @route GET /files
// @desc  Display all files in JSON
router.get('/api/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: 'No files exist'
        });
      }
  
      // Files exist
      return res.json(files);
    });
  });
  
  
  // @route GET /files/:filename
  // @desc  Display single file object
  router.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      // File exists
      return res.json(file);
    });
  });
  
  
  router.get('/:filename', (req, res) => {
    console.log("in")
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
      console.log(file);
      // Check if image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        // Read output to browser
        console.log("streamed")
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image'
        });
      }
    });
  });

  router.post('/images',upload.single("img"),async (req,res,err)=> {
    // if(err){
    // res.status(500).send({message: err.message})
    // return;
    // }

    res.send('success');
  })

  
module.exports = {router,upload};