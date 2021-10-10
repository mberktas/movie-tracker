import axios from "axios";

const getPopularMovies = async () => {
  const result = await axios
    .get("/api/popular-movies")
    .then((data) => data.data);
  return result;
};

const getMovieDetails = async (id) => {
  let result = await axios.get(`/api/movie?id=${id}`).then((data) => data.data);
  return result;
};

const getTopRatedMovies = async () => {
  let result = await axios
    .get("/api/top-rated-movies")
    .then((data) => data.data);
  return result;
};

const getMovieVideos = async (id) => {
  let result = await axios
    .get(`/api/movie-videos?id=${id}`)
    .then((data) => data.data);

  let temp = result.filter((r) => r.type == "Trailer");

  return temp;
};

const getMovieGenres = async () => {
  let result = await axios.get("/api/movie-genres").then((data) => data.data);
  return result;
};

const getRecommendedMovies = async (id) => {
  let result = await axios
    .get(`/api/recommended-movies?id=${id}`)
    .then((data) => data.data);
  return result;
};

const getSearchQueryMovies = async (query) => {
  let result = await axios
    .get(`/api/search?query=${query}`)
    .then((data) => data.data);
  return result;
};

export {
  getPopularMovies,
  getMovieDetails,
  getTopRatedMovies,
  getMovieVideos,
  getMovieGenres,
  getRecommendedMovies,
  getSearchQueryMovies,
};
