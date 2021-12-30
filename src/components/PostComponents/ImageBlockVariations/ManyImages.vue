<template>
  <div class="column" v-if="images.length > 3">
    <div class="post_images_inner">
      <div class="main_image_inner">
        <img class="main_image" :src="'/img/' + images[0].filename">
      </div>
    </div>

    <div class="space_between">
      <div class="bottom_image_inner third_image_inner">
        <img class="third_image" :src="'/img/' + images[1].filename">
      </div>

      <div class="bottom_image_inner third_image_inner">
        <img class="third_image" :src="'/img/' + images[2].filename">
      </div>

      <div class="bottom_image_inner third_image_inner">
        <img class="third_image" :src="'/img/' + images[3].filename">
      </div>
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
