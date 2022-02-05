<template>
  <div v-if="images && images.length == 1" class="post_image_block_1">
    <div class="post_image_inner" @click="selectImages(0)">
      <img :src="staticSrc + '/post_images/' + images[0].filename" class="post_image">
    </div>
  </div>

  <div v-if="images && images.length == 2" class="post_image_block_2">
    <div class="post_image_inner" @click="selectImages(0)">
      <img :src="staticSrc + '/post_images/' + images[0].filename" class="post_image">
    </div>

    <div class="post_image_inner" @click="selectImages(1)">
      <img :src="staticSrc + '/post_images/' + images[1].filename" class="post_image">
    </div>
  </div>

  <div v-if="images && images.length == 3" class="post_image_block_3">
    <div class="post_image_inner one_of_three" @click="selectImages(0)">
      <img :src="staticSrc + '/post_images/' + images[0].filename" class="post_image">
    </div>

    <div class="post_image_inner one_of_three" @click="selectImages(1)">
      <img :src="staticSrc + '/post_images/' + images[1].filename" class="post_image">
    </div>

    <div class="post_image_inner one_of_three" @click="selectImages(2)">
      <img :src="staticSrc + '/post_images/' + images[2].filename" class="post_image">
    </div>
  </div>

  <div v-if="images && images.length >= 4" class="post_image_block_4">
    <div class="post_image_inner one_of_four" @click="selectImages(0)">
      <img :src="staticSrc + '/post_images/' + images[0].filename" class="post_image">
    </div>

    <div class="post_image_inner one_of_four" @click="selectImages(1)">
      <img :src="staticSrc + '/post_images/' + images[1].filename" class="post_image">
    </div>

    <div class="post_image_inner one_of_four" @click="selectImages(2)">
      <img :src="staticSrc + '/post_images/' + images[2].filename" class="post_image">
    </div>

    <div class="post_image_inner one_of_four" @click="selectImages(3)">
      <img :src="staticSrc + '/post_images/' + images[3].filename" class="post_image">
    </div>
  </div>
</template>

<style src="@/assets/css/componentsStyles/imageBlock.css"></style>

<script>
  export default {
    props: {
      "staticSrc": { type: String, default: "/" },
      "images": { type: Array, default: [] },
    },

    emits: [ "selectImageGroup" ],

    methods: {
      selectImages(start){ this.$emit("selectImageGroup", this.images, start) }
    }
  }
</script>
