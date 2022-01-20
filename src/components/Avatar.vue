<template>
  <div class="avatar_inner" :class="frameClasses">
    <img :src="imgSrc" class="avatar" :class="imgClasses">
  </div>
</template>

<script>
export default {
  props: {
    "imgSrc": { type: String, default: "" },
    "frameClasses": { type: Array, default: [] },
    "imgClasses": { type: Array, default: [] }
  }
}
</script>
