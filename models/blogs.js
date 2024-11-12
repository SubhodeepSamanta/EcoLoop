const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Review = require("./review");
const Joi = require("joi");

const blogsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required:true,
},
  description: {
    type: String,
    required:true,
},
});

// listingSchema.post("findOneAndDelete", async (listing) => {
//   if (listing) {
//     await Review.deleteMany({ _id: { $in: listing.reviews } });
//   }
// });

const Blogs = mongoose.model("Blogs", blogsSchema);
module.exports = Blogs;
