const Blog = require("../models/blogs.js");

module.exports.index = async (req, res) => {
  res.render("listings/blogs.ejs",);
};

module.exports.createListing = async (req, res) => {
  res.render("listings/blogsnew.ejs");
};

module.exports.load = async (req, res) => {
  res.render("listings/idfirst.ejs")
};
module.exports.load2 = async (req, res) => {
  res.render("listings/idfifth.ejs")
};
module.exports.tutorial = async (req, res) => {
  res.render("listings/tutorial.ejs")
};
module.exports.video = async (req, res) => {
  res.render("listings/video.ejs")
};