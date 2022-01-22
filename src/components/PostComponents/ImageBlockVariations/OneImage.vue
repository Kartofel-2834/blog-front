<template>
  <div class="post_images_inner" v-if="images.length == 1">
    <div class="main_image_inner">
      <img
        :src="staticSrc + '/post_images/' + images[0].filename"
        class="main_image"
        @click="imageClickListener(0)"
      >
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
    },
  }
</script>
