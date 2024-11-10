
module.exports.getRent = async (req, res) => {
  res.render("listings/rent",{ user: req.user });
};
