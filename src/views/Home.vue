<template>
  <div class="gallery">
    <gallery :msg="'Image Gallery'" />
  </div>
</template>

<script>

import GalleryComponent from "@/views/gallery/gallery.vue";

export default {
  name: "Home",
  components: {
    "gallery": GalleryComponent
  }
};
</script>
