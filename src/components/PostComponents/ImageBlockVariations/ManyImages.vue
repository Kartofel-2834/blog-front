<template>
  <div class="column" v-if="images.length > 3">
    <div class="post_images_inner">
      <div class="main_image_inner">
        <img
          class="main_image" :src="'/img/' + images[0].filename"
          @click="imageClickListener(0)"
        >
      </div>
    </div>

    <div class="space_between">
      <div class="bottom_image_inner third_image_inner">
        <img
          class="main_image" :src="'/img/' + images[1].filename"
          @click="imageClickListener(1)"
        >
      </div>

      <div class="bottom_image_inner third_image_inner">
        <img
          class="main_image" :src="'/img/' + images[2].filename"
          @click="imageClickListener(2)"
        >
      </div>

      <div class="bottom_image_inner third_image_inner">
        <img
          class="main_image" :src="'/img/' + images[3].filename"
          @click="imageClickListener(3)"
        >
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      "images":{ type: Array, default: [] },
      "method_for_open_fullscreen": { type: Function, default: ()=>{} },
      "select_image_group_method": { type: Function, default: ()=>{} }
    },

    methods: {
      imageClickListener(start){
        this.select_image_group_method(this.images, start)
        this.method_for_open_fullscreen()
      }
    }
  }
</script>
