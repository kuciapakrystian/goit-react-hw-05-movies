import { getMovieByName } from 'ApiService/MoviesApi';
import { SearchForm } from 'components/SearchForm';
import { SearchMovie } from 'components/SearchMovie';
import { Box } from 'helpers/Box/Box';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Status = {
  INIT: 'init',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(Status.INIT);

  const page = searchParams.get('page') ?? 1;
  const search = searchParams.get('search') ?? '';

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getMovieByName(search, page);
        setMovies(data);
        setStatus(Status.SUCCESS);
      } catch (error) {
        setStatus(Status.ERROR);
        console.log(error.message);
      }
    };
    if (search) {
      getData();
    } else {
      setMovies([]);
    }
  }, [search, page]);

  const handleUpdateSearch = value => {
    setSearchParams({ search: value, page: 1 });
  };

  return (
    <Box>
      <SearchForm onSubmit={handleUpdateSearch} />
      <SearchMovie value={search} movies={movies} status={status} />
    </Box>
  );
};