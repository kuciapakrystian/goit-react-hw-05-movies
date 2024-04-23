import { getMovieReviews } from 'ApiService/MoviesApi';
import { Loader } from 'components/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './Reviews.module.css';

const pageStatus = {
  INIT: 'init',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState(pageStatus.INIT);

  const params = useParams();
  const id = params.movieId;

  useEffect(() => {
    setStatus(pageStatus.LOADING);
    async function getData() {
      try {
        const data = await getMovieReviews(id);
        setReviews(data);
        setStatus(pageStatus.SUCCESS);
      } catch (error) {
        setStatus(pageStatus.ERROR);
      }
    }
    getData();
  }, [id]);

  const getPostDate = date => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timezone: 'UTC',
    };

    return new Date(date).toLocaleString('en', options);
  };

  return (
    <>
      {status === pageStatus.ERROR && (
        <p className={style.error}>ERROR, REVIEWS NOT FOUND</p>
      )}

      {(status === pageStatus.LOADING || status === pageStatus.INIT) && (
        <Loader />
      )}

      {status === pageStatus.SUCCESS && reviews.length === 0 && (
        <p className={style.error}>REVIEWS NOT FOUND</p>
      )}

      {status === pageStatus.SUCCESS && (
        <ul className={style.list}>
          {reviews?.map(item => (
            <li className={style.item} key={item.id}>
              <h3 className={style.name}>{item.author}</h3>
              <p className={style.text}>{item.content}</p>
              <span className={style.date}>{getPostDate(item.updated_at)}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};