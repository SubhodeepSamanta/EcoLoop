const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const blogsController = require("../controllers/blogs.js");
const { storage } = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(blogsController.index)) //Index Route

  router.get("/new", isLoggedIn, wrapAsync(blogsController.createListing));
  router.get("/idfirst", isLoggedIn, wrapAsync(blogsController.load));
  router.get("/idfifth", isLoggedIn, wrapAsync(blogsController.load2));
  router.get("/tutorial", isLoggedIn, wrapAsync(blogsController.tutorial));
  router.get("/tutorial/video", isLoggedIn, wrapAsync(blogsController.video));
  router.post("/new",isLoggedIn,
    validateListing,upload.single("listing[image]"),
    wrapAsync(blogsController.create)
  );

module.exports = router;
