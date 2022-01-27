<template>
  <div class="buble_menu_element align" :class="cssClasses" @mouseover="hoverOn" @mouseout="hoverOff">
    <div class="buble_menu_element_icon delete_icon" :class="hover ? hoverIconClasses : []"></div>
    <div class="buble_menu_element_text">Delete post</div>
  </div>
</template>

<script>
  export default {
    props: {
      "cssClasses": { type: Array, default: [] },
      "hoverClasses": { type: Array, default: [] },
      "hoverIconClasses": { type: Array, default: [] },
    },

    data(){ return { hover: false } },

    methods: {
      hoverOn(){ this.hover = true },
      hoverOff(){ this.hover = false },
    }
  }
</script>
