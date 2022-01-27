<template>
  <div class="post_buble_menu_inner grid_layout_inner" id="bubleButton">
    <div class="grid_layout_element" style="z-index: 20" @click="$emit('open')">
      <div class="buble_inner column">
        <div class="just_buble"></div>
        <div class="just_buble"></div>
        <div class="just_buble"></div>
      </div>
    </div>

    <div class="buble_menu" :class="{ 'buble_menu_opened': opened }" id="bubleMenu">
      <buble-menu-element
        :cssClasses="['delete_post_button']"
        :hoverIconClasses="['delete_icon_active']"
        @click="$emit('deletePost')"
      ></buble-menu-element>
    </div>
  </div>
</template>

<script>
  import BubleMenuElement from "./BubleMenuElement.vue"

  export default {
    props: { "opened": { type: Boolean, default: false } },

    components: { "buble-menu-element": BubleMenuElement },

    emits: [ "open", "close", "deletePost" ],
  }
</script>
