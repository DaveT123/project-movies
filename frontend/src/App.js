import logo from "./logo.svg";
import "./App.css";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Reviews from "./components/reviews/Reviews";
import NotFound from "./components/notFound/NotFound";

function App() {
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = async () => {
        try {
            const response = await api.get("/api/v1/movies");
            console.log(response);
            setMovies(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const getMovieData = async (movieId) => {
        try {
            const response = await api.get(`/api/v1/movies/${movieId}`);
            const singleMovie = response.data;
            setMovie(singleMovie);
            setReviews(singleMovie.reviewIds);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home movies={movies} />} />
                    <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
                    <Route
                        path="/Reviews/:movieId"
                        element={
                            <Reviews
                                getMovieData={getMovieData}
                                movie={movie}
                                reviews={reviews}
                                setReviews={setReviews}
                            />
                        }
                    />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
