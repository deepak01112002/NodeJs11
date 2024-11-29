const express = require("express");
const MovieModel = require("../Model/MovieSchema");
const MovieRouter = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const s = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/assets"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const Data = multer({ storage: s });

MovieRouter.post("/addmovie", Data.single("poster"), async (req, res) => {
  try {
    const movieData = {
      movieName: req.body.movieName,
      imdbRating: req.body.imdbRating,
      type: req.body.type,
      genre: req.body.genre,
      releaseYear: req.body.releaseYear,
      image: req.file ? req.file.filename : null,
    };
    let data = await MovieModel.create(movieData);
    // console.log(data);
    res.status(200).send({ msg: "Data Added successfully", data: data });
    // res.redirect('/allmovie')
  } catch (error) {
    res.status(401).send({ msg: error.message });
  }
});

MovieRouter.get("/allmovie", async (req, res) => {
  try {
    let data = await MovieModel.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(401).send({ msg: error.message});
  }
});
MovieRouter.get("/allmovie/:id", async (req, res) => {
  try {
    let data = await MovieModel.findOne({_id : req.params.id});
    res.status(200).send(data);
  } catch (error) {
    res.status(401).send({ msg: error.message});
  }
});


MovieRouter.delete("/deletemovie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await MovieModel.findById(id);
    
    if (data.image) {
      const image_path = path.join(__dirname, "../public/assets", data.image);
      
      if (fs.existsSync(image_path)) {
        fs.unlinkSync(image_path);
      }
    }
    
    await MovieModel.findByIdAndDelete(id);
    res.status(200).send({ msg: "Data Deleted Successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).send({ msg: error.message });
  }
});

MovieRouter.put("/editmovie/:id", Data.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const oldMovie = await MovieModel.findById(id);
    
    // Prepare updated movie data
    const movieData = {
      movieName: req.body.movieName,
      imdbRating: req.body.imdbRating,
      type: req.body.type,
      genre: req.body.genre,
      releaseYear: req.body.releaseYear,
      image: req.file ? req.file.filename : null,
    };
    console.log(movieData)

    // Handle image update
    if (req.file) {
      // Delete old image if it exists
      if (oldMovie.image) {
        const oldImagePath = path.join(__dirname, "../public/assets", oldMovie.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    // Update the movie
    const updatedMovie = await MovieModel.findByIdAndUpdate(
      id,
      movieData,
    );

    res.status(200).send({ 
      msg: "Movie Updated Successfully", 
      data: updatedMovie 
    });

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).send({ msg: error.message });
  }
});

module.exports = MovieRouter;
