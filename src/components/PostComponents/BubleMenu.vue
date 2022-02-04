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

<script>
  import BubleMenuElement from "./BubleMenuElement.vue"

  export default {
    props: { "opened": { type: Boolean, default: false } },

    components: { "buble-menu-element": BubleMenuElement },

    emits: [ "open", "close", "deletePost" ],
  }
</script>

<style>
  .post_menu_inner{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: inherit;

    justify-self: end;
  }

  .menu_dots_inner{
    grid-column: 1/2;
    grid-row: 1/2;
    margin: auto;
  }

  .post_menu::before{
    width: 2rem;
    height: 2rem;
  }

  .menu_dots_inner{
    display: flex;
    text-align: center;
    font-size: 1.7em;
    font-weight: 600;
    z-index: 10;
  }

  .menu_dot{
    width: 7px;
    height: 7px;
    border-radius: 100%;
    margin-left: 3px;
    background-color: #1c1c1c;
  }

  .post_menu{
    justify-self: end;
    width: fit-content;
  }

  .buble_menu{
    position: absolute;
    background: white;
    margin-top: 2.5rem;
    transform: scale(0);
    border-radius: 6px;
    box-shadow: 0px 0px 4px 1px rgb(34 60 80 / 22%);
    overflow: hidden;

    font-size: inherit;
    transition: 0.15s linear;
    transform-origin: top;
  }

  .buble_menu_opened{
    transform: scale(1);
  }

  .buble_menu_element{
    width: -webkit-fill-available;
    height: fit-content;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: inherit;
  }

  .buble_menu_element_text{
    user-select: none;
    color: inherit;
    margin-left: 0.5rem;
    font-size: 0.8em;
    text-transform: uppercase;
    font-weight: 600;
  }

  .buble_menu_element_icon{
    width: 1.2rem;
    height: 1.2rem;
  }

  .delete_post_button{
    transition: background-color 0.15s linear;
  }

  .delete_post_button:hover{
    background-color: #e34646;
    color:white;
  }

  .delete_icon{
    background: no-repeat center/100%;
    background-image: url("~@/assets/icons/trash_black.svg");
  }

  .delete_icon_active{ background-image: url("~@/assets/icons/trash_white.svg") }

  @media all and (max-width: 700px){
    .post_menu::before{
      width: 1.5rem;
      height: 1.5rem;
    }

    .menu_dots_inner{
      transform: rotate(90deg);
    }

    .menu_dot{
      width: 4px;
      height: 4px;
      margin-top: 0px;
      margin-left: 2px;
    }

    .buble_menu_element{
      padding: 0.3em;
    }

    .buble_menu_element_text{
      text-align: center;
      margin: 0;
      font-size: 0.6em;
    }

    .buble_menu_element_icon{ display: none }
  }
</style>
