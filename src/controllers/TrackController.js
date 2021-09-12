const mongoose = require("mongoose");
const multer = require("multer");
const { Readable } = require("stream");

const postTrack = async (req, res, next) => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage: storage,
    limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }
  });
  upload.single("track")(req, res, (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Upload Request Validation Failed" });
    } else if (!req.body.name) {
      return res.status(400).json({ message: "No track name in request body" });
    }

    let trackName = req.body.name;
    const readableTrackStream = new Readable();
    readableTrackStream.push(req.file.buffer);
    readableTrackStream.push(null);
    let { db } = mongoose.connection;
    let bucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: "tracks"
    });

    let uploadStream = bucket.openUploadStream(trackName);
    let id = uploadStream.id;
    readableTrackStream.pipe(uploadStream);
    uploadStream.on("error", () => {
      return res.status(500).json({ message: "Error uploading file" });
    });

    uploadStream.on("finish", () => {
      return res.status(201).json({
        message:
          "File uploaded successfully, stored under Mongo ObjectID: " + id
      });
    });
  });
};

const getTrack = async (req, res, next) => {
  res.send("hello world");
};

module.exports = {
  postTrack,
  getTrack
};
