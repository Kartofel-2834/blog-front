<template>
  <!-- 1 photo-->
  <one-image-block
    :images="images"
    :method_for_open_fullscreen="method_for_open_fullscreen"
    :select_image_group_method="select_image_group_method"
  ></one-image-block>

  <!-- 2 photo -->
  <two-images-block
    :images="images"
    :method_for_open_fullscreen="method_for_open_fullscreen"
    :select_image_group_method="select_image_group_method"
  ></two-images-block>

  <!--3 photo -->
  <three-images-block
    :images="images"
    :method_for_open_fullscreen="method_for_open_fullscreen"
    :select_image_group_method="select_image_group_method"
  ></three-images-block>

  <!-- more then 3 photo -->
  <many-images-block
    :images="images"
    :method_for_open_fullscreen="method_for_open_fullscreen"
    :select_image_group_method="select_image_group_method"
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
      "method_for_open_fullscreen": { type: Function, default: ()=>{} },
      "select_image_group_method": { type: Function, default: ()=>{} },
    },

    components: {
      "many-images-block": ImageBlockForManyImages,
      "three-images-block": ImageBlockForThreeImages,
      "two-images-block": ImageBlockForTwoImages,
      "one-image-block": ImageBlockForOneImage,
    },
  }
</script>
