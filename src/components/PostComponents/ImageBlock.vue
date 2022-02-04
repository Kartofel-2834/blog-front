<template>
  <div v-if="images && images.length == 1" class="post_image_block_1">
    <div class="post_image_inner">
      <img :src="staticSrc + '/post_images/' + images[0].filename" class="post_image">
    </div>
  </div>

  <div v-if="images && images.length == 2" class="post_image_block_2">
    <div class="post_image_inner">
      <img :src="staticSrc + '/post_images/' + images[0].filename" class="post_image">
    </div>

    <div class="post_image_inner">
      <img :src="staticSrc + '/post_images/' + images[1].filename" class="post_image">
    </div>
  </div>

  <div v-if="images && images.length == 3" class="post_image_block_3">
    <div class="post_image_inner one_of_three">
      <img :src="staticSrc + '/post_images/' + images[0].filename" class="post_image">
    </div>

    <div class="post_image_inner one_of_three">
      <img :src="staticSrc + '/post_images/' + images[1].filename" class="post_image">
    </div>

    <div class="post_image_inner one_of_three">
      <img :src="staticSrc + '/post_images/' + images[2].filename" class="post_image">
    </div>
  </div>

  <div v-if="images && images.length >= 4" class="post_image_block_4">
    <div class="post_image_inner one_of_four">
      <img :src="staticSrc + '/post_images/' + images[0].filename" class="post_image">
    </div>

    <div class="post_image_inner one_of_four">
      <img :src="staticSrc + '/post_images/' + images[1].filename" class="post_image">
    </div>

    <div class="post_image_inner one_of_four">
      <img :src="staticSrc + '/post_images/' + images[2].filename" class="post_image">
    </div>

    <div class="post_image_inner one_of_four">
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
    }
  }
</script>
