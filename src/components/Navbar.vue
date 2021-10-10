<template>
  <div class="container mt-5">
    <nav class="navbar">
      <router-link class="navbar-brand" to="/"
        ><img src="@/assets/logo.svg" />
      </router-link>
      <div class="search mt-3">
        <i
          class="fas fa-search"
          style="position:absolute; padding:12px 10px 12px 10px; color:#79778f; font-weight:400;"
        ></i>
        <input
          class="search-input"
          type="text"
          placeholder="Search for a movie"
          v-model="searchInput"
        />

        <div class="search-dropdown" v-if="searchInput != '' ? true : false">
          <ul class="search-dropdown-menu" @click="closeSearchBar()">
            <router-link
              :to="`/movie/${movie.id}`"
              v-for="movie in searchedMovies"
              :key="movie.id"
            >
              <li>
                <div class="search-dropdown-menu-item">
                  <div class="search-dropdown-menu-item-poster">
                    <img :src="imageUrl(movie.poster_path)" />
                  </div>
                  <div class="search-dropdown-menu-item-content">
                    <div style="display:flex;">
                      <div style="max-width:60%">
                        {{ movie.title }}

                        <span style="font-size:0.7rem">{{
                          movieReleaseYear(movie.release_date)
                        }}</span>
                      </div>
                      <span
                        style="display:inline-block; text-align:right; width:30%;"
                        >{{ movie.vote_average }}</span
                      >
                    </div>
                    <div style="font-size:0.7rem; color:#79778f;">
                      {{ movie.overview }}
                    </div>
                  </div>
                </div>
              </li>
            </router-link>

            <div v-if="searchedMovies.length == 0" class="text-center py-3">
              NO RESULTS
            </div>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { getSearchQueryMovies } from "@/api/tmdb_api.js";
import { ref, watch } from "vue";
import movie from "@/utils/movie.js";
export default {
  setup() {
    const searchInput = ref("");
    const searchedMovies = ref([]);

    const { imageUrl, movieReleaseYear } = movie();

    const closeSearchBar = () => {
      searchInput.value = "";
    };

    watch(searchInput, async (currentValue, oldValue) => {
      if (currentValue == "") searchedMovies.value = [];
      else if (currentValue != oldValue)
        searchedMovies.value = await getSearchQueryMovies(currentValue);
    });
    return {
      searchInput,
      searchedMovies,
      imageUrl,
      movieReleaseYear,
      closeSearchBar,
    };
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 40%;
  height: 40px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: #79778f;
  border: 0;
  z-index: 2;

  @media (max-width: 1000px) {
    width: 80%;
  }
  &-input {
    padding: 10px 30px 10px 30px;
    border-radius: 10px;
    background-color: #0c081f;
    transition: all 0.3s ease;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0);
    width: 100%;
    height: 100%;
    color: white;

    &:hover,
    &:active,
    &:focus {
      box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
    }
    & {
      border: 0;
      outline: 0;
    }
  }

  &-dropdown {
    display: flex;
    width: 100%;
    margin-top: 10px;
    border-radius: 10px;
    min-height: 50px;
    max-height: 500px;
    background-color: #0c081f;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.75);
    overflow-y: scroll;
    overflow-x: hidden;

    a {
      text-decoration: none;
      color: white;
    }

    &-menu {
      list-style: none;
      padding: 0;
      text-align: left;
      width: 100%;
      height: 100%;
      margin: 0;

      &-item {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        max-height: 140px;
        overflow: hidden;
        &-content {
          display: flex;
          flex-wrap: wrap;
          width: 80%;
          * {
            width: 100%;
          }
        }

        &-poster {
          width: 20%;
          img {
            width: 100%;
            border-radius: 5px;
          }
        }
      }
      a:last-child {
        * {
          border: 0;
        }
      }
      li {
        border-bottom: 1px solid gray;
        padding: 10px;

        div {
          padding-left: 5px;
          padding-right: 5px;
        }
      }
    }
  }
}
</style>
