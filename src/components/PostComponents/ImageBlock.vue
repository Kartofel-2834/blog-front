<template>
  <!-- 1 photo-->
  <one-image-block
    :staticSrc="staticSrc"
    :images="images"

    @openInFullscreen="fullscreenModeOn"
    @setImageGroup="selectImageGroup"
  ></one-image-block>

  <!-- 2 photo -->
  <two-images-block
    :staticSrc="staticSrc"
    :images="images"

    @openInFullscreen="fullscreenModeOn"
    @setImageGroup="selectImageGroup"
  ></two-images-block>

  <!--3 photo -->
  <three-images-block
    :staticSrc="staticSrc"
    :images="images"

    @openInFullscreen="fullscreenModeOn"
    @setImageGroup="selectImageGroup"
  ></three-images-block>

  <!-- more then 3 photo -->
  <many-images-block
    :staticSrc="staticSrc"
    :images="images"

    @openInFullscreen="fullscreenModeOn"
    @setImageGroup="selectImageGroup"
  ></many-images-block>
</template>

<script>
  import ImageBlockForManyImages from "./ImageBlockVariations/ManyImages.vue"
  import ImageBlockForThreeImages from "./ImageBlockVariations/ThreeImages.vue"
  import ImageBlockForTwoImages from "./ImageBlockVariations/TwoImages.vue"
  import ImageBlockForOneImage from "./ImageBlockVariations/OneImage.vue"

  export default {
    props: {
      "images": { type: Array, default: [] },
      "staticSrc": { type: String, default: "" },
    },

    emits: [ "openInFullscreen", "setImageGroup" ],

    methods: {
      fullscreenModeOn(){ this.$emit('openInFullscreen') },

      selectImageGroup(images, start){
        this.$emit('setImageGroup', images, start)
      },
    },

    components: {
      "many-images-block": ImageBlockForManyImages,
      "three-images-block": ImageBlockForThreeImages,
      "two-images-block": ImageBlockForTwoImages,
      "one-image-block": ImageBlockForOneImage,
    },
  }
</script>
