const mongoose = require("mongoose")

const MovieSchema = mongoose.Schema({
    title : {type : String},
    poster : String,
    rating : String,
})

const MovieModel = mongoose.model("movie", MovieSchema)

module.exports = MovieModel