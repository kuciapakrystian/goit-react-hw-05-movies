import { getMovieDetalis } from 'ApiService/MoviesApi';
import { Box } from 'helpers/Box/Box';
import { Suspense, useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import defaultImg from '../../img/default-movie.jpeg';
import style from './MovieDetails.module.css';

export const MovieDetails = () => {
  const activeClassName = ({ isActive }) =>
    isActive ? `${style.active}` : `${style.navLinkA}`;

  const location = useLocation();

  const [film, setFilm] = useState([]);

  const params = useParams();
  const id = params?.movieId;

  useEffect(() => {
    async function getData() {
      try {
        const data = await getMovieDetalis(id);
        setFilm(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getData();
  }, [id]);

  return (
    <Box>
      <Link
        to={
          location?.state?.from?.pathname + location?.state?.from?.search ?? '/'
        }
        className={style.add}
      >
        Back
      </Link>
      <div className={style.infoBox}>
        <div className={style.imgBox}>
          <img
            className={style.img}
            src={
              film?.poster_path
                ? `https://image.tmdb.org/t/p/w200${film.poster_path}`
                : defaultImg
            }
            alt=""
          />
        </div>

        <div className={style.infoText}>
          <h2 className={style.name}>{film.original_title}</h2>
          <h3 className={style.title}>Release date</h3>
          <p className={style.text}>
            {film.release_date ? film.release_date : 'No data available'}
          </p>
          <h3 className={style.title}>Rating</h3>
          <p className={style.text}>{film.vote_average}</p>
          <h3 className={style.title}>Genres</h3>
          <ul className={style.list}>
            {film?.genres?.length === 0 ? (
              <p className={style.text}>No data available</p>
            ) : (
              film?.genres?.map(item => (
                <li key={item.name}>
                  <p className={style.text}>{item.name}</p>
                </li>
              ))
            )}
          </ul>
          <h3 className={style.title}>Overview</h3>
          <p className={style.text}>
            {film.overview ? film.overview : 'No data available'}
          </p>
        </div>
      </div>
      <div>
        <ul className={style.linkList}>
          <li className={style.linkIt}>
            <NavLink
              to="cast"
              className={activeClassName}
              state={location?.state ?? '/'}
            >
              cast
            </NavLink>
          </li>
          <li className={style.linkIt}>
            <NavLink
              to="reviews"
              className={activeClassName}
              state={location?.state ?? '/'}
            >
              reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Suspense>
        <Outlet />
      </Suspense>
    </Box>
  );
};