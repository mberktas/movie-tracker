<template>
  <div class="scrollable">
    <movie-card v-for="movie in movies" :movie="movie" :key="movie.id" />
  </div>
</template>

<script>
import MovieCard from "@/components/MovieCard.vue";
import { inject } from "@vue/runtime-core";

export default {
  name: "ScrollableMoviesList",
  components: {
    MovieCard,
  },
  props: {
    movies: Array,
  },

  setup() {},
};
</script>

<style lang="scss" scoped>
.scrollable {
  padding-bottom: 20px;
  width: 100%;
  height: auto;
  min-height: 0;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
}
</style>
