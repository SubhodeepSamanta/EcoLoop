const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const landingController = require("../controllers/landing.js");
const { storage } = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(landingController.index)) //Index Route
  .post( //Create Route
    isLoggedIn,
    validateListing,upload.single("listing[image]"),
    wrapAsync(landingController.createListing)
  );
  
//New Route
router.get("/new", isLoggedIn, wrapAsync(landingController.renderNewForm));

router
  .route("/:id")
  .get(landingController.showListing) //Show Route
  .put(
    //Update Route
    isLoggedIn,
    isOwner,upload.single("listing[image]"),
    validateListing,
    wrapAsync(landingController.updateListing)
  )
  .delete(
    //Delete Route
    isLoggedIn,
    isOwner,
    wrapAsync(landingController.destroyListing)
  );

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(landingController.renderEditForm)
);

module.exports = router;
