<template>
  <div class="container mx-auto my-5">
    <div style="text-align:left; color:white; font-size:1.5rem">
      What's Popular
    </div>
    <scrollable-movies-list :movies="popularMovies" :genres="genres" />
  </div>

  <div class="container mx-auto my-5">
    <div style="text-align:left; color:white; font-size:1.5rem">
      Top Rated
    </div>
    <scrollable-movies-list :movies="topRatedMovies" :genres="genres" />
  </div>
</template>

<script>
import ScrollableMoviesList from "@/components/ScrollableMoviesList.vue";
import { getPopularMovies, getTopRatedMovies } from "@/api/tmdb_api";
import { ref } from "@vue/reactivity";
import { inject, onMounted } from "@vue/runtime-core";

export default {
  components: { ScrollableMoviesList },
  name: "Home",

  setup() {
    const popularMovies = ref([]);
    const topRatedMovies = ref([]);
    const genres = inject("genres");

    onMounted(async () => {
      popularMovies.value = await getPopularMovies();
      topRatedMovies.value = await getTopRatedMovies();
    });

    return {
      popularMovies,
      topRatedMovies,
      genres,
    };
  },
};
</script>

<style lang="scss">
body {
  background-color: #17152a;
}
</style>
