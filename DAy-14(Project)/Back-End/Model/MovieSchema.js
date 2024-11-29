const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  movieName: { type: String },
  image: { type: String },
  imdbRating: { type: String },
  genre: { type: String },
  type: { type: String },
  releaseYear: { type: String },
  Like : {type : Number, default : 0}
});
const MovieModel = mongoose.model("movie", MovieSchema);

module.exports = MovieModel;
