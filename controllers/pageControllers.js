const Photo = require('../models/photo')
exports.addphotoPage = (req, res) => {
  res.render("addphoto");
};
exports.aboutPage = (req, res) => {
  res.render("about");
};

exports.photoEdit = async (req, res) => {
  const updatePhoto = await Photo.findById(req.params.id);
  res.render("edit", { updatePhoto });
};
