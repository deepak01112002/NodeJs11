import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditMovie = () => {
    const { id } = useParams(); 
    const [state, setState] = useState({
        movieName: '',
        imdbRating: '',
        type: '',
        genre: '',
        releaseYear: '',
        image: null,
    });

    useEffect(() => {
        console.log("Movie ID:", id);

        const fetchMovie = async () => {
            try {
                const response = await fetch(`http://localhost:3344/allmovie/${id}`);
                console.log("Response status:", response.status);
                
                if (!response.ok) {
                    throw new Error('Movie not found');
                }
                
                const data = await response.json();
                console.log(data);
                
                setState({
                    movieName: data.movieName || '',
                    imdbRating: data.imdbRating || '',
                    type: data.type || '',
                    genre: data.genre || '',
                    releaseYear: data.releaseYear || '',
                    image: data.image || ""
                });
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        };

        if (id) {
            fetchMovie();
        }
    }, [id]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'image') {
            setState({ ...state, [name]: e.target.files[0] });
        } else {
            setState({ ...state, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("movieName", state.movieName);
        formData.append("imdbRating", state.imdbRating);
        formData.append("type", state.type);
        formData.append("genre", state.genre);
        formData.append("releaseYear", state.releaseYear);
        if (state.image) {
            formData.append("image", state.image);
        }
        try {
            const response = await fetch(`http://localhost:3344/editmovie/${id}`, {
                method: "PUT",
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                console.log("Movie updated successfully:", data);
                navigate('/allmovie'); 
            } else {
                console.error("Update failed:", data.msg);
            }
        } catch (error) {
            console.error("Error updating movie:", error);
        }
    };
    return (
        <>
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

                <div className="form-group">
                    <label>Poster</label>
                    <input
                        type="file"
                        id="poster"
                        name="image"
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
                        value={state.imdbRating}
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
                        value={state.type}
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
                        value={state.genre}
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
        
        </>
    )
}

export default EditMovie;

