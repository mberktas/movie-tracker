const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";

const imageUrl = (url) => {
  return `${BASE_IMG_URL}/${url}`;
};

const movieReleaseYear = (date) => {
  console.log(date);
  let year = date.split("-")[0];
  return year;
};

export default () => {
  return {
    imageUrl,
    movieReleaseYear,
  };
};
