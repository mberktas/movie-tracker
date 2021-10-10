<template>
  <div class="movie-card">
    <router-link :to="`/movie/${movie.id}`">
      <div class="movie-card-wrapper">
        <img :src="imageUrl" class="movie-card-wrapper-img" />
      </div>
      <div class="movie-card-rate">
        {{ movie.vote_average.toFixed(1) }}
      </div>
      <div class="movie-card-bottom">
        <div class="movie-card-bottom-title">{{ movie.title }}</div>
        <div class="movie-card-bottom-subtitle">
          <span>{{ movieReleaseYear }}</span>
          <span style="margin-left:10px;">{{ movieGenre }}</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { inject } from "@vue/runtime-core";
export default {
  name: "MovieCard",
  props: {
    movie: Object,
  },

  setup(props, context) {
    const genres = inject("genres");
    const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500/";
    const imageUrl = computed(() => {
      return `${BASE_IMG_URL}${props.movie.poster_path}`;
    });

    const movieReleaseYear = computed(() => {
      return props.movie.release_date.split("-")[0];
    });

    const movieGenre = computed(() => {
      let genreOfMovie = [];
      props.movie.genre_ids.forEach((genre) => {
        genres.value.forEach((g) => {
          if (g.id == genre) {
            genreOfMovie.push(g.name);
          }
        });
      });

      genreOfMovie = genreOfMovie.slice(0, 2);
      genreOfMovie = genreOfMovie.toString();
      genreOfMovie = genreOfMovie.replace(/,/g, " | ");
      return genreOfMovie;
    });

    return {
      movieGenre,
      movieReleaseYear,
      imageUrl,
    };
  },
};

//computed: {
// imageUrl() {
//   return `${this.BASE_IMG_URL}${this.movie.poster_path}`;
// },
// movieReleaseYear() {
//   return this.movie.release_date.split("-")[0];
// },
// movieGenre() {
//   let genres = [];
//   this.movie.genre_ids.forEach((genre) => {
//     this.genres.forEach((g) => {
//       if (g.id == genre) {
//         genres.push(g.name);
//       }
//     });
//   });

//   genres = genres.slice(0, 2);
//   genres = genres.toString();
//   genres = genres.replace(/,/g, " | ");
//   return genres;
// },
//},

// data() {
//   return {
//     BASE_IMG_URL: "https://image.tmdb.org/t/p/w500/",
//   };
// },
//};
</script>

<style lang="scss" scoped>
.movie-card {
  padding: 0;
  min-width: 250px;
  max-width: 250px;
  border-radius: 5px;
  margin: 30px 30px 30px 0px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    .movie-card-img {
      transform: scale(2);
    }
  }

  a {
    text-decoration: none;
  }
  &-wrapper {
    border-radius: 5px;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
    max-width: 250px;
    max-height: 375px;
    margin-bottom: 10px;
    overflow: hidden;
    transition: all 0.3s;
    &:hover {
      box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);

      .movie-card-wrapper-img {
        transform: scale(1.1);
      }
    }
    &-img {
      border-radius: 5px;
      max-width: 250px;
      max-height: 375px;
      margin-bottom: 10px;
      transition: all 0.3s;
    }
  }

  &-rate {
    font-weight: 600;
    text-align: center;
    color: white;
    border-radius: 5px;
    padding: 10px;
    background: #7f00ff; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #e100ff,
      #7f00ff
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #e100ff,
      #7f00ff
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    -webkit-box-shadow: 0px 10px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 10px 5px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 10px 5px 0px rgba(0, 0, 0, 0.75);
    position: absolute;
    width: 38px;
    height: 38px;
    top: 0;
    right: 0;
    margin-right: 20px;
    margin-top: 20px;
  }

  &-bottom {
    &-title {
      color: white;
    }
    &-subtitle {
      color: #79778f;
    }
  }
}
</style>
