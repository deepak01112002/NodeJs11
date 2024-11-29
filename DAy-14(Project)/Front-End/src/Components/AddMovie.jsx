import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
    const [state, setState] = useState({
        movieName: '',
        imdbRating: '',
        type:'',
        genre: '',
        releaseYear: '',
        poster: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'poster') {
            setState({ ...state, [name]: e.target.files[0] });
        } else {
            setState({ ...state, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(state);

        const formData = new FormData();
        formData.append('movieName', state.movieName);
        formData.append('imdbRating', state.imdbRating);
        formData.append('type', state.type);
        formData.append('genre', state.genre);
        formData.append('releaseYear', state.releaseYear);
        formData.append('poster', state.poster);

        try {
            const response = await fetch(`http://localhost:3344/addmovie`, {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Movie added successfully:', result);
                navigate('/allmovie'); 
            } else {
                console.error('Failed to add movie:', result.message);
            }
        } catch (error) {
            console.error('Error during submission:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Add Movie Details</h2>
            <form onSubmit={handleSubmit} action='/addmovie' method='post' encType="multipart/form-data">
                <div className="form-group">
                    <label>Movie Name</label>
                    <input
                        type="text"
                        id="movieName"
                        name="movieName"
                        value={state.movieName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group" >
                    <label>Poster</label>
                    <input
                        type="file"
                        style={{color:'black'}}
                        id="poster"
                        name="poster"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>IMDB Rating</label>
                    <input
                        type="number"
                        id="imdbRating"
                        name="imdbRating"
                        onChange={handleChange}
                        min="0"
                        max="10"
                        step="0.1"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Type</label>
                    <select
                        id="genre"
                        name="type"
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="movie">Movie</option>
                        <option value="web-series">Web-Series</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Genre</label>
                    <select
                        id="genre"
                        name="genre"
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Genre</option>
                        <option value="action">Action</option>
                        <option value="comedy">Comedy</option>
                        <option value="drama">Drama</option>
                        <option value="horror">Horror</option>
                        <option value="sci-fi">Sci-Fi</option>
                        <option value="thriller">Thriller</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Release Year</label>
                    <input
                        type="number"
                        id="releaseYear"
                        name="releaseYear"
                        value={state.releaseYear}
                        onChange={handleChange}
                        min="1900"
                        max="2024"
                        required
                    />
                </div>

                <button type="submit">Add Movie</button>
            </form>
        </div>
    );
};

export default AddMovie;
