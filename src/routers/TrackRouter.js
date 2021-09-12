const express = require("express");
const { postTrack, getTrack } = require("../controllers/TrackController");

const router = express.Router();

router.get("/", getTrack);
router.post("/", postTrack);

module.exports = {
  routes: router
};
