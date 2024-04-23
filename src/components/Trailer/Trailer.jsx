import { getMovieTrailer } from 'ApiService/MoviesApi';
import { Loader } from 'components/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import defaultImgCast from '../../img/default-image.jpg';
// import style from './Cast.module.css';

const pageStatus = {
  INIT: 'init',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const Trailer = () => {
  const [trailer, setTrailer] = useState([]);
  const [status, setStatus] = useState(pageStatus.INIT);

  const params = useParams();
  const id = params.movieId;

  useEffect(() => {
    setStatus(pageStatus.LOADING);
    async function getData() {
      try {
        const data = await getMovieTrailer(id);
        setTrailer(data);

        setStatus(pageStatus.SUCCESS);
      } catch (error) {
        setStatus(pageStatus.ERROR);
      }
    }
    getData();
  }, [id]);

  return (
    <>
      {status === pageStatus.LOADING && <Loader />}

      {status === pageStatus.ERROR && <p>ERROR, CAST NOT FOUND</p>}

      {status === pageStatus.SUCCESS && trailer.length === 0 && (
        <p>CAST NOT FOUND</p>
      )}

      {status === pageStatus.SUCCESS && (
        <ul>
          {/* {trailer?.map((item, index) => (
            <li className={style.photoItem} key={index}>
              <img
                className={style.photo}
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
                    : defaultImgCast
                }
                alt=""
              />
              <h3 className={style.name}>{item.original_name}</h3>
              <p className={style.role}>
                {item.character ? item.character : 'role'}
              </p>
            </li>
          ))} */}
        </ul>
      )}
    </>
  );
};