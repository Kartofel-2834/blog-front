<template>
  <!-- 1 photo-->
  <one-image-block
    :staticSrc="staticSrc"
    :images="images"
    :methodForOpenFullscreen="methodForOpenFullscreen"
    :selectImageGroupMethod="selectImageGroupMethod"
  ></one-image-block>

  <!-- 2 photo -->
  <two-images-block
    :staticSrc="staticSrc"
    :images="images"
    :methodForOpenFullscreen="methodForOpenFullscreen"
    :selectImageGroupMethod="selectImageGroupMethod"
  ></two-images-block>

  <!--3 photo -->
  <three-images-block
    :staticSrc="staticSrc"
    :images="images"
    :methodForOpenFullscreen="methodForOpenFullscreen"
    :selectImageGroupMethod="selectImageGroupMethod"
  ></three-images-block>

  <!-- more then 3 photo -->
  <many-images-block
    :staticSrc="staticSrc"
    :images="images"
    :methodForOpenFullscreen="methodForOpenFullscreen"
    :selectImageGroupMethod="selectImageGroupMethod"
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
      "methodForOpenFullscreen": { type: Function, default: ()=>{} },
      "selectImageGroupMethod": { type: Function, default: ()=>{} },
    },

    components: {
      "many-images-block": ImageBlockForManyImages,
      "three-images-block": ImageBlockForThreeImages,
      "two-images-block": ImageBlockForTwoImages,
      "one-image-block": ImageBlockForOneImage,
    },
  }
</script>
