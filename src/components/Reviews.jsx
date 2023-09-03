import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = () => {
      fetch(
        `
https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=a42bf4f31f7d8fb3cfc076b340ef7462`
      )
        .then(resp => resp.json())
        .then(data => {
          setReviews(data.results);
        })
        .catch(err => console.log(err));
    };

    fetchReviews();
  }, [movieId]);

  return (
    <>
      {reviews.length === 0 && <p>There are no reviews found</p>}

      {reviews.map(review => (
        <ul key={review.id}>
          <li>
            <h2> Author: {review.author}</h2>
            <p>{review.content}</p>
          </li>
        </ul>
      ))}
    </>
  );
};
export default Reviews;
