import React from 'react'; // Remove { useRef }
import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

import css from '../components/styles/movieDetails.module.css';

const MovieDetails = ({ id }) => {
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);

  const { movieId } = useParams();
  
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/movies";
  const baseUrl = 'https://image.tmdb.org/t/p/w200';
  const movieUrl = movie.poster_path;
  const ApiKey = '167940d181678e9686c25c43b11eb557';

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=167940d181678e9686c25c43b11eb557`
    )
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        console.log(data);

        setGenres(data.genres);
      })
      .catch(err => console.log(err));
  }, [movieId]);

  const yearCount = () => {
    if (!movie.release_date) {
      return;
    }
    return movie.release_date.slice(0, 4);
  };

  return (
    <div className={css.movieContainer}>
      <Link to={backLinkHref}>
        <button className={css.buttonback}> ← Go back</button>
      </Link>
      <div className={css.description}>
        <img
          className={css.posterImg}
          src={`${baseUrl}${movieUrl}?api_key=${ApiKey}`}
          alt="movie poster"
        />
        <div>
          <h2>
            {movie.title} ({yearCount()})
          </h2>
          <p>User score: {movie.vote_average}%</p>
          <h3>Overwiew</h3>
          <p>{movie.overview}</p>
          <h4>Genres</h4>
          <div className={css.genres}>
            {genres.map(item => (
              <ul className={css.genre} key={item.id}>
                <li className={css.list}>{item.name}</li>
              </ul>
            ))}
          </div>
        </div>
      </div>
      <div className={css.info}>
        <h4 className={css.infoTitle}>Additional information</h4>
        <ul>
          <li>
            <Link to={`/movies/${movieId}/cast`}>CAST</Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetails;