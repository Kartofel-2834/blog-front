<template>
  <div class="post_images_inner row" v-if="images.length == 2">
    <div class="half_image_inner">
      <img class="image_in_frame" :src="'/img/' + images[0].filename">
    </div>

    <div class="half_image_inner">
      <img class="image_in_frame" :src="'/img/' + images[1].filename">
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
