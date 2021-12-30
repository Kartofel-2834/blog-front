<template>
  <div class="post_images_inner" v-if="images.length == 1">
    <div class="main_image_inner">
      <img class="main_image" :src="'/img/' + images[0].filename">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      "images":{ type: Array, default: [] }
    }
  }
</script>
