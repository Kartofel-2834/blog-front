<template>
  <div class="column" v-if="images.length == 3">
    <div class="post_images_inner">
      <div class="main_image_inner">
        <img
          class="main_image" :src="staticSrc + '/post_images/' + images[0].filename"
          @click="imageClickListener(0)"
        >
      </div>
    </div>

    <div class="space_between">
      <div class="bottom_image_inner second_image_inner">
        <img
          class="second_image" :src="staticSrc + '/post_images/' + images[1].filename"
          @click="imageClickListener(1)"
        >
      </div>

      <div class="bottom_image_inner second_image_inner">
        <img
          class="second_image" :src="staticSrc + '/post_images/' + images[2].filename"
          @click="imageClickListener(2)"
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
