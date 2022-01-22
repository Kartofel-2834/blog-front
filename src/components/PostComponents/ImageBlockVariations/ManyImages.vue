<template>
  <div class="column" v-if="images.length > 3">
    <div class="post_images_inner">
      <div class="main_image_inner">
        <img
          class="main_image" :src="staticSrc + '/post_images/' + images[0].filename"
          @click="imageClickListener(0)"
        >
      </div>
    </div>

    <div class="space_between">
      <div class="bottom_image_inner third_image_inner">
        <img
          class="main_image" :src="staticSrc + '/post_images/' + images[1].filename"
          @click="imageClickListener(1)"
        >
      </div>

      <div class="bottom_image_inner third_image_inner">
        <img
          class="main_image" :src="staticSrc + '/post_images/' + images[2].filename"
          @click="imageClickListener(2)"
        >
      </div>

      <div class="bottom_image_inner third_image_inner">
        <img
          class="main_image" :src="staticSrc + '/post_images/' + images[3].filename"
          @click="imageClickListener(3)"
        >
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      "staticSrc": { type: String, default: "" },
      "images":{ type: Array, default: [] },
    },

    emits: [ "openInFullscreen", "setImageGroup" ],

    methods: {
      imageClickListener(start){
        this.$emit('setImageGroup', this.images, start)
        this.$emit('openInFullscreen')
      }
    }
  }
</script>
