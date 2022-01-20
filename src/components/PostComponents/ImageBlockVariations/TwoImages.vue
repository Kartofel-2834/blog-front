<template>
  <div class="post_images_inner row" v-if="images.length == 2">
    <div class="half_image_inner">
      <img
        class="image_in_frame" :src="staticSrc + '/post_images/' + images[0].filename"
        @click="imageClickListener(0)"
      >
    </div>

    <div class="half_image_inner">
      <img
        class="image_in_frame" :src="staticSrc + '/post_images/' + images[1].filename"
        @click="imageClickListener(1)"
      >
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      "staticSrc": { type: String, default: "" },
      "images":{ type: Array, default: [] },
      "methodForOpenFullscreen": { type: Function, default: ()=>{} },
      "selectImageGroupMethod": { type: Function, default: ()=>{} },
    },

    methods: {
      imageClickListener(start){
        this.selectImageGroupMethod(this.images, start)
        this.methodForOpenFullscreen()
      }
    }
  }
</script>
