const fs = require("fs");
const Photo = require("../models/photo");
exports.getAllPhotos = async (req, res) => {
  const page = req.query.pages  || 1;
  const photosPerPage = 2;

  const totalPhotos = await Photo.find().countDocuments();
  

  const photos = await Photo.find({})
    .skip((page - 1) * photosPerPage)
    .limit(photosPerPage);
  // PAGES

  res.render("index", {
    photos: photos,
    current: page,
    pages: Math.ceil(totalPhotos / photosPerPage),
  });
};

exports.getPhoto = async (req, res) => {
  const photoDetail = await Photo.findById(req.params.id);
  res.render("detail", {
    photoDetail,
  });
};
exports.createPhoto = async (req, res) => {
  const uploadDir = "public/uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadImage = req.files.image;
  let uploadPath = __dirname + "/../public/uploads/" + uploadImage.name;
  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadImage.name,
    });
  });
  res.redirect("/");
};

exports.updatephoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  console.log(photo.title);
  await photo.save();
  res.redirect(`/photo/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  const deletePath = __dirname + "/../public" + photo.image;
  fs.unlinkSync(deletePath);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect("/");
};
