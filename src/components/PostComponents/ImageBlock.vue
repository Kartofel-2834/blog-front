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

<script>
  export default {
    props: {
      "staticSrc": { type: String, default: "/" },
      "images": { type: Array, default: [] },
    }
  }
</script>

<style>
  .post_image_block_1{
    display: grid;
    grid-template-columns: minmax(100px, 1fr);
    grid-template-rows: fit-content(90vh);
    justify-content: center;
    align-content: center;
  }

  .post_image_block_2{
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: fit-content(80vh);
    column-gap: 1rem;
  }

  .post_image_block_3{
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: fit-content(40vh) fit-content(40vh);
    gap: 1rem;
  }

  .post_image_block_4{
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: fit-content(26vh) fit-content(26vh) fit-content(26vh);
    gap: 1rem;
  }

  .one_of_three:first-child{
    grid-row-start: 1;
    grid-row-end: 3;
  }

  .one_of_four:first-child{
    grid-row-start: 1;
    grid-row-end: 4;
  }

  .post_image_inner, .post_image{ border-radius: 10px }

  .post_image_inner{
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .post_image{
    width: 100%;
  }

  @media all and (max-width: 750px){
    .post_image_block_2, .post_image_block_3, .post_image_block_4{
      gap: 0.5rem;
    }

    .post_image_block_2{
      grid-template-columns: 1fr;
      grid-template-rows: fit-content(40vh) fit-content(40vh);
    }

    .post_image_block_3{
      grid-template-columns: auto auto;
      grid-template-rows: fit-content(65vh) fit-content(15vh);
    }

    .post_image_block_4{
      grid-template-columns: auto auto auto;
      grid-template-rows: fit-content(65vh) fit-content(15vh);
    }

    .one_of_three:first-child{
      grid-row: 1/2;
      grid-column: 1/3
    }

    .one_of_four:first-child{
      grid-column: 1/4;
      grid-row: 1/2;
    }
  }
</style>
