<template>
  <navbar />
  <router-view />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { onMounted, provide } from "@vue/runtime-core";
import { genres, getAllGenres } from "@/utils/genres.js";
export default {
  name: "App",
  components: {
    Navbar,
  },

  setup() {
    onMounted(async () => {
      await getAllGenres();
    });

    provide("genres", genres);
  },
};
</script>

<style lang="scss">
$clr-background: #17152a;

html {
  font-size: 14px;
}

@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap");
#app {
  font-size: 12px;
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
}

body {
  background-color: $clr-background;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  border-radius: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #17152a;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(219, 219, 219);
  border-radius: 20px;
}
</style>
