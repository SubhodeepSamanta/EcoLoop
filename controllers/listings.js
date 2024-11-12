const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = async (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested No Longer Exists");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.handbags = async (req, res) => {
  res.render("listings/handbags.ejs");
};

module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  const { path, filename } = req.file;
  req.flash("success", "New Listing Created");
  newListing.owner = req.user._id;
  newListing.image = { url: path, filename };
  await newListing.save();
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested No Longer Exists");
    res.redirect("/listings");
  }
  let originalImage=listing.image.url;
  originalImage=originalImage.replace("/upload","/upload/w_250")
  res.render("listings/edit.ejs", { listing ,originalImage });
};

module.exports.updateListing = async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "Enter a valid Listing!");
  }
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if(typeof req.file!=="undefined"){
  const { path, filename } = req.file;
  listing.image = { url:path, filename };
  await listing.save();
  }
  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  console.log(deletedListing);
  res.redirect("/listings");
};
