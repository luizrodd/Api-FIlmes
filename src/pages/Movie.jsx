import React, { useEffect, useState } from 'react'
import {BsWallet2, BsGraphUp, BsHourglassSplit, BsFillFileEarmarkTextFill} from 'react-icons/bs'

import './Movie.css'
import { useParams } from 'react-router-dom';

import MovieCard from '../components/MovieCard'

const moviesURL = import.meta.env.VITE_API;
const apiKEY = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const {id} = useParams()
  const [movie, setMovie] = useState(null)

  const getMovie = async(URL) => {
    const res = await fetch(URL);
    const data = await res.json();

    setMovie(data);
  }

  const FormatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style:"currency",
      currency: "USD"
    })
  }

  useEffect(() => {
    const movieURL = `${moviesURL}${id}?${apiKEY}`
    getMovie(movieURL)
  }, [])
  return (
    <div className='movie-page'>
      {movie && (
        <>
        <MovieCard movie={movie} showLink={false}/>
        <p className='tagline'>{movie.tagline}</p>
        <div className="info">
          <h3>
            <BsWallet2/> Orçamento:
          </h3>
          <p>
            {FormatCurrency(movie.budget)}
          </p>
        </div>
        <div className="info">
          <h3>
            <BsGraphUp/> Faturamento:
          </h3>
          <p>
            {FormatCurrency(movie.revenue)}
          </p>
        </div>
        
        <div className="info">
          <h3>
            <BsHourglassSplit/> Duração:
          </h3>
          <p>
            {movie.runtime} minutos
          </p>
        </div>
        <div className="info">
          <h3>
            <BsFillFileEarmarkTextFill/> Descrição:
          </h3>
          <p className='description'>
            {movie.overview}
          </p>
        </div>
        </>
      )}
    </div>
  )
}

export default Movie
