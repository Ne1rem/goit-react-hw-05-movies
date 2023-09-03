import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

import '../components/movies.css';

import css from '../components/styles/movies.module.css';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [SearchedMovie, setSearchedMovie] = useState(null);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const queryParams = new URLSearchParams(params.toString());
    const queryParam = queryParams.get('query');
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [params]);

  const handleInputValue = e => {
    setSearchQuery(e.target.value);
  };

  const fetchRequest = () => {
    if (searchQuery === '') {
      return;
    }

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=a42bf4f31f7d8fb3cfc076b340ef7462`
    )
      .then(res => res.json())
      .then(data => {
        if (data.results.length === 0) {
          Toastify({
            text: 'No data found!',
            duration: 3000,
            destination: 'https://github.com/apvarun/toastify-js',
            newWindow: true,
            close: true,
            gravity: 'top', 
            position: 'center', 
            stopOnFocus: true,
            style: {
              background:
                'radial-gradient(circle, rgba(236,9,32,1) 0%, rgba(42,20,18,1) 100%)',
            },
            onClick: function () {},
          }).showToast();
        }

        setSearchedMovie(data.results);

        setParams({ query: searchQuery });
      })
      .catch(err => console.log(err));
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    fetchRequest();
  };

  const test = () => {
    if (!SearchedMovie) {
      return;
    }
    SearchedMovie.map(movie =>
      setParams({ id: movie.id })
    );
  };

  console.log(params);
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          className={css.input}
          id="input"
          onChange={handleInputValue}
        ></input>
        <button className={css.searchBtn}>Search</button>
      </form>

      {SearchedMovie &&
        SearchedMovie.map(movie => {
          return (
            <ul key={movie.id}>
              <li>
                <Link onClick={test} to={`/movies/${movie.id}`}>
                  {movie.title}
                </Link>
              </li>
            </ul>
          );
        })}
    </>
  );
};

export default Movies;