const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const { storage } = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index)) //Index Route
  .post( //Create Route
    isLoggedIn,
    validateListing,upload.single("listing[image]"),
    wrapAsync(listingController.createListing)
  );
  
//New Route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));
router.get("/handbags", isLoggedIn, wrapAsync(listingController.handbags));

router
  .route("/:id")
  .get(listingController.showListing) //Show Route
  .put(
    //Update Route
    isLoggedIn,
    isOwner,upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    //Delete Route
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  );

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
