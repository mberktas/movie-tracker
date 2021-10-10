<template>
  <template v-if="isLoading">
    <div class="my-5 container mx-auto">
      Loading...
    </div>
  </template>
  <div v-if="!isLoading">
    <div class="backdrop-image row">
      <div class="overlay">
        <div class="container">
          <div class="row justify-content-center">
            <div
              class=" col-12 col-xl-3"
              style="padding-left:0; text-align:left"
            >
              <img class="poster" :src="imageUrl(movie.poster_path)" />
            </div>
            <div class=" col-12 col-xl-9 movie">
              <div class="movie-title">
                <span>{{ movie.title }}</span>
                <span
                  style="font-size:2rem; color:#79778F ; font-weight:normal ; margin-left: 10px;"
                  >{{ movieReleaseYear(movie.release_date) }}</span
                >
              </div>
              <ul class="movie-details row mb-4">
                <li class="movie-details-item row col">
                  <span>Rate</span>
                  <span>{{ movie.vote_average.toFixed(1) }}</span>
                </li>
                <li class="movie-details-item row col">
                  <span>Language</span>
                  <span>{{ movie.spoken_languages[0].name }}</span>
                </li>
                <li class="movie-details-item row col">
                  <span>Duration</span>
                  <span>{{ movie.runtime + " Min" }}</span>
                </li>
                <li class="movie-details-item row col">
                  <span>Studio</span>
                  <span>{{
                    movie.production_companies.length != 0
                      ? movie.production_companies[0].name
                      : "-"
                  }}</span>
                </li>

                <li class="movie-details-item row col">
                  <span>Genre</span>
                  <span>{{ getAllGenres }}</span>
                </li>
              </ul>
              <div class="movie-overview">
                <div class="movie-overview-tagline">
                  {{ movie.tagline }}
                </div>
                {{ movie.overview }}
              </div>
              <span
                v-if="movieVideos.length"
                class="col-12 mt-5 mb-3 d-block"
                style="font-size:1.2rem;  color:#79778f;"
                >Movie Trailers</span
              >
              <div class="movie-trailers pb-3">
                <movie-video-modal
                  class="col-4"
                  v-for="(video, index) in movieVideos"
                  :key="index"
                  :videoUrl="`https://www.youtube.com/embed/${video.key}`"
                  :videoThumbnail="
                    `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`
                  "
                ></movie-video-modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <span style="font-size:1.5rem; color:white;">Recommendations</span>
      <div class="top-rated-movies">
        <scrollable-movies-list
          :movies="recommendedMovies"
        ></scrollable-movies-list>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getMovieDetails,
  getTopRatedMovies,
  getMovieVideos,
  getMovieGenres,
  getRecommendedMovies,
} from "@/api/tmdb_api.js";
import MovieVideoModal from "@/components/MovieVideoModal.vue";
import ScrollableMoviesList from "@/components/ScrollableMoviesList.vue";
import { computed, ref } from "@vue/reactivity";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import movieUtils from "@/utils/movie.js";
import { onMounted, watch } from "@vue/runtime-core";

export default {
  name: "MovieDetails",
  components: {
    MovieVideoModal,
    ScrollableMoviesList,
  },

  setup(props, context) {
    onMounted(async () => {
      await init();
    });

    const init = async () => {
      movie.value = await getMovieDetails(movieId.value);
      topRatedMovies.value = await getTopRatedMovies();
      movieVideos.value = await getMovieVideos(movieId.value);
      recommendedMovies.value = await getRecommendedMovies(movieId.value);
      scrollToTop();
      isLoading.value = false;
    };

    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    const movie = ref({});
    const topRatedMovies = ref([]);
    const movieVideos = ref([]);
    const recommendedMovies = ref([]);

    const { imageUrl, movieReleaseYear } = movieUtils();

    const isLoading = ref(true);
    const route = useRoute();

    const movieId = computed(() => {
      return route.params.id;
    });

    const getAllGenres = computed(() => {
      let genres = movie.value.genres.map((genre) => genre.name);
      genres = genres.toString();
      genres = genres.split(",").join(" | ");

      return genres;
    });

    watch(route, async (to, from) => {
      console.log(route.path);
      const path = route.path;
      if (path.startsWith("/movie")) await init();
    });

    return {
      movie,
      recommendedMovies,
      movieVideos,
      imageUrl,
      movieReleaseYear,
      movieId,
      isLoading,
      getAllGenres,
    };
  },
};
</script>

<style lang="scss">
.backdrop-image {
  background-size: cover;
  margin: 0;
}

.overlay {
  background: rgba(23, 21, 42, 0.7);
  margin: 0;
  .poster {
    width: 250px;
    border-radius: 10px;
    //box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
  }

  .container {
    margin-top: 100px;
    margin-bottom: 100px;
  }
}

.movie {
  text-align: left;
  &-title {
    color: #fffefd;
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 30px;
  }
  &-overview {
    color: #fffefd;
    line-height: 2;
    &-tagline {
      font-size: 1.2rem;
      color: #79778f;
    }
  }

  &-details {
    color: #79778f;
    text-transform: capitalize;

    padding: 0;
    &-item {
      line-height: 1.5;
      height: fit-content;
      span {
        &:last-child {
          color: white;
        }
      }
    }
  }

  &-trailers {
    overflow: auto;
    white-space: nowrap;
    max-width: 100%;

    * {
      display: inline-block;
      margin-right: 20px;
    }
  }
}

.top-rated-movies {
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  max-width: 100%;
  margin-bottom: 30px;
}
</style>
