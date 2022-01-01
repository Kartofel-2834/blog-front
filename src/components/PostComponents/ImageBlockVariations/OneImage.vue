<template>
  <div class="post_images_inner" v-if="images.length == 1">
    <div class="main_image_inner">
      <img class="main_image" :src="'/img/' + images[0].filename"  @click="imageClickListener(0)">
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
