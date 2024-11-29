const mongoose = require("mongoose");

const connet = async () => {
  await mongoose.connect("mongodb+srv://karan:raval@cluster0.howpl.mongodb.net/MoviesData?retryWrites=true&w=majority&appName=Cluster0");
  console.log("DataBase Is Connected Successfully");
};
module.exports = connet;
