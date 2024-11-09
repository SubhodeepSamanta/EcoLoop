const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, validateReview , isReviewAuthor } = require("../middleware.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const reviewController=require("../controllers/review.js")

//Reviews Post

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

//Delete Reviews Post

router.delete(
  "/:reviewId",
  isLoggedIn,isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
