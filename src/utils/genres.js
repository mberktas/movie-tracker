import { ref } from "vue";
import { getMovieGenres } from "@/api/tmdb_api";
const genres = ref([]);

const getAllGenres = async () => {
  genres.value = await getMovieGenres();
};
export { genres, getAllGenres };
