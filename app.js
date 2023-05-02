const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const app = express();
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const Photo = require("./models/photo");
const { constants } = require("buffer");
const photoController = require('./controllers/photoControllers')
const pageController = require('./controllers/pageControllers')
// TEMPLATE ENGİNE
app.set("view engine", "ejs");
const port = 3002;

//Mongoose connect
mongoose.connect("mongodb://127.0.0.1:27017/pcat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MİDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);



// ROUTES
app.post("/upload", photoController.createPhoto);
app.get("/", photoController.getAllPhotos);
app.get("/photo/:id", photoController.getPhoto);
app.put("/photos/:id", photoController.updatephoto);
app.delete("/photo/:id", photoController.deletePhoto);
app.get("/about", pageController.aboutPage);
app.get("/addphoto",pageController.addphotoPage );
app.get("/photos/edit/:id", pageController.photoEdit);


app.listen(port, () => {
  console.log(`NodeJs ${port} da çalışıyor.`);
});
