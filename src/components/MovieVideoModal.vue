<template>
  <div style="cursor:pointer;">
    <img @click="toggleModal" class="video-img" :src="videoThumbnail" />

    <div v-if="showModal" class="modal" @click="toggleModal">
      <div class="container text-center m-auto">
        <iframe :src="videoUrl"> </iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "MovieVideoModal",
  props: {
    videoThumbnail: String,
    videoUrl: String,
  },

  setup() {
    const showModal = ref(false);

    const toggleModal = () => {
      showModal.value = !showModal.value;
    };

    return {
      showModal,
      toggleModal,
    };
  },
  // data() {
  //   return { showModal: false };
  // },

  // methods: {
  //   toggleModal() {
  //     this.showModal = !this.showModal;
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.video-img {
  width: 100%;
  border-radius: 5px;
}
.modal {
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);

  .container {
    height: 70%;
  }
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
