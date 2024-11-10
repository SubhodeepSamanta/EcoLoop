const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const {getRent} = require("../controllers/rent.js")
const { storage } = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });


router.get(
    "/",
    isLoggedIn,
    wrapAsync(getRent),
  );

  // router.post(
  //   "/",
  //   isLoggedIn,

  // );

  module.exports = router;