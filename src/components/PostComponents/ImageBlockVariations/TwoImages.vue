<template>
  <div class="post_images_inner row" v-if="images.length == 2">
    <div class="half_image_inner">
      <img
        class="image_in_frame" :src="'/img/' + images[0].filename"
        @click="imageClickListener(0)"
      >
    </div>

    <div class="half_image_inner">
      <img
        class="image_in_frame" :src="'/img/' + images[1].filename"
        @click="imageClickListener(1)"
      >
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      "images":{ type: Array, default: [] },
      "method_for_open_fullscreen": { type: Function, default: ()=>{} },
      "select_image_group_method": { type: Function, default: ()=>{} },
    },

    methods: {
      imageClickListener(start){
        this.select_image_group_method(this.images, start)
        this.method_for_open_fullscreen()
      }
    }
  }
</script>
