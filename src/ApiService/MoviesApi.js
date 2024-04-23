import axios from 'axios';

const API_KEY = '6e5639f9d4cb9f087b8042a8acc9c8e2';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export async function getHomeMovies() {
  const { data } = await axios.get(`/trending/movie/week`, {
    params: { api_key: API_KEY },
  });
  return data.results;
}

export async function getMovieByName(query, page) {
  const { data } = await axios.get(`/search/movie`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
      page,
      query,
    },
  });

  return data.results;
}

export async function getMovieDetalis(id) {
  const { data } = await axios.get(`/movie/${id}`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
    },
  });

  return data;
}

export async function getMovieCast(id) {
  const { data } = await axios.get(`/movie/${id}/credits`, {
    params: {
      api_key: API_KEY,
      language: 'en-US',
    },
  });
  return data.cast;
}

export async function getMovieReviews(id) {
  const { data } = await axios.get(
    `/movie/${id}/reviews
`,
    {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    }
  );
  return data.results;
}