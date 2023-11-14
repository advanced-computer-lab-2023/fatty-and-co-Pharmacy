// file
const { default: mongoose } = require("mongoose");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

//file upload
//Init gfs
let gfs;
var conn = mongoose.connection;
conn.once("open", () => {
  //Init stream
  gfs = new Grid(conn.db, mongoose.mongo);
  gfs.collection("pharm_request_uploads");
});

//create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "pharm_request_uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });
const pharmUpload = upload.fields([
  { name: "IdFile", maxCount: 1 },
  { name: "WorkingLicense", maxCount: 1 },
  { name: "PharmacyDegree", maxCount: 1 },
]);

// download one file by filename
const getFileByFilename = async (filename, res) => {
  try {
    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "pharm_request_uploads",
    });
    const downloadStream = bucket.openDownloadStreamByName(filename);
    return downloadStream;
  } catch (err) {
    res.status(404).send("File not found");
  }
};

module.exports = { pharmUpload , getFileByFilename };
