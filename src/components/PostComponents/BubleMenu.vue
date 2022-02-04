<template>
  <div class="post_menu_inner">
    <div class="layout_button post_menu" id="bubleMenu" @click="$emit('open')">
      <div class="menu_dots_inner">
        <div class="menu_dot"></div>
        <div class="menu_dot"></div>
        <div class="menu_dot"></div>
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

<style src="@/assets/css/componentsStyles/bubleMenu.css"></style>

<script>
  import BubleMenuElement from "./BubleMenuElement.vue"

  export default {
    props: { "opened": { type: Boolean, default: false } },

    components: { "buble-menu-element": BubleMenuElement },

    emits: [ "open", "close", "deletePost" ],
  }
</script>
