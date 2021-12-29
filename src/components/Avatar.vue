<template>
  <div class="avatar_inner" :class="frame_classes">
    <img :src="img_src" class="avatar" :class="img_classes">
  </div>
</template>

<script>
export default {
  props: {
    "img_src": { type: String, default: "" },
    "frame_classes": { type: Array, default: [] },
    "img_classes": { type: Array, default: [] }
  }
}
</script>
