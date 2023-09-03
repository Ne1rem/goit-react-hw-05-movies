import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import css from '../components/styles/cast.module.css';

function Cast() {
  const [actors, setActors] = useState([]);
  const { movieId } = useParams();

  const baseApiUrl = 'https://image.tmdb.org/t/p/w500';

  const apiKey = '167940d181678e9686c25c43b11eb557';

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=167940d181678e9686c25c43b11eb557`
    )
      .then(res => res.json())
      .then(data => {
        setActors(data.cast);
      })
      .catch(err => console.log(err));
  }, [movieId]);

  console.log(actors);
  return (
    <>
      {actors.map(actor => (
        <ul key={actor.id}>
          <li key={actor.id}>
            <img
              className={css.actorImg}
              src={`${baseApiUrl}${actor.profile_path}?api_key=${apiKey}`}
              alt={actor.name}
            />
            <p className={css.actorText}>{actor.name}</p>
            <p className={css.actorText}>Character: {actor.character}</p>
          </li>
        </ul>
      ))}

      <p>CAST</p>
    </>
  );
}
export default Cast;
