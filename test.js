const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect("mongodb://127.0.0.1:27017/pcat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const PhotoSchema = new Schema({
  title:String,
  description: String,
  image:String,
  date: {
    type: Date,
    default: Date.now,
  },
});
const Photo = mongoose.model("Photo", PhotoSchema);
module.exports = Photo;