import React, { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import '../components/movies.css';
import css from '../components/styles/movies.module.css';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [SearchedMovie, setSearchedMovie] = useState(null);
  const [params, setParams] = useSearchParams();
  
  const handleInputValue = e => {
    setSearchQuery(e.target.value);
  };

  const fetchRequest = useCallback((query) => {
    if (query === '') {
      return;
    }
  
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=167940d181678e9686c25c43b11eb557`
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

        setParams({ query });
      })
      .catch(err => console.log(err));
  }, [setParams]);
  

  useEffect(() => {
    const queryParams = new URLSearchParams(params.toString());
    const queryParam = queryParams.get('query');
    if (queryParam) {
      setSearchQuery(queryParam);
      fetchRequest(queryParam);
    }
  }, [params, fetchRequest]); 

  const handleFormSubmit = e => {
    e.preventDefault();

    fetchRequest(searchQuery);
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
          value={searchQuery} // Додав value, щоб відображати введений текст
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
