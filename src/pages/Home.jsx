import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

import './MovieGrid.css'
const moviesURL = import.meta.env.VITE_API;
const apiKEY = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (URL) => {
    const res = await fetch(URL);
    const data = await res.json();

    setTopMovies(data.results);
    console.log(data.results)
  };

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?${apiKEY}`;

    getTopRatedMovies(topRatedUrl);
  }, []);

  return (
    <div className="container">
      <h2 className="title">Melhores Filmes:</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies && topMovies.map((movie) => <MovieCard movie={movie} key={movie.id}/>)}
      </div>
    </div>
  );
};

export default Home;
