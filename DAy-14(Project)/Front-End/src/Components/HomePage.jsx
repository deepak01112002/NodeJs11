import React, { useState, useEffect } from "react";
import "../assets/Homepage.css";
import { Link } from "react-router-dom";


const HomePage = () => {
  const [movies, setMovies] = useState([]); 
  const [delmovie, setdelMovies] = useState([]); 

  useEffect(() => {
    fetch("http://localhost:3344/allmovie")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, [delmovie]); 

  const handleEdit = (id) => {
    console.log(id);
  }


  console.log(movies)

  const handleDelete = (id) => {
    fetch(`http://localhost:3344/deletemovie/${id}`, {
      method: "DELETE",
    })
    .then((res) => res.json())
    .then((data) => setdelMovies(data))
    .catch((error) => console.error("Error deleting movie:", error));
  }

  return (
    <>
      <div className="wrapper">
        <div className="search-block">
          <a href="/">
            <h1>TheMovieDB</h1>
          </a>
          <form
            id="search-form"
            onSubmit={(e) => {
              e.preventDefault(); 
             }}
          >
            <input type="text" id="query" placeholder="Search movies..." />
            <button className="btn" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="row" id="root">
          {movies.map((el, index) => (
              <div className="col" key={index}>
                <div className="card">
                  <a className="card-media">
                    <img src={`http://localhost:3344/assets/${el.image}`} alt={el.movieName} width="100%"  onError={(e) => console.error("Image load error:", e)} />
                  </a>
                  <div className="card-content">
                    <div className="card-cont-header">
                      <div className="cont-left">
                        <h3 style={{ color: "#12efec",fontWeight: 600 }}>{el.type} : {el.movieName}</h3>
                        <span style={{ color: "#12efec" }}>
                          Year : {el.releaseYear}
                        </span>
                      </div>
                      <div className="cont-right">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn"
                        >
                         IMDB = {el.imdbRating}
                        </a>
                      </div>
                    </div>
                    <div className="describe" style={{ color: "#12efec" }}>Gener : {el.genre}</div>
                    <div className="btns"><span className="btn1" onClick={() => handleDelete(el._id)}>Delete</span> <Link to={`/editMovie/${el._id}`} className="btn1">Edit</Link></div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default HomePage;
