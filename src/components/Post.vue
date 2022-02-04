<template>
  <div class="post_block" @click="postClick">
    <div class="post_top_nav">
      <div class="post_info">
        <div class="info_el avatar_inner short_avatar">
          <!--<img src="@/assets/icons/avatar.svg" class="avatar">-->
        </div>

        <div class="text_user_info">
          <div class="name">{{ userName }} {{ userSurname }}</div>
          <publication-date :date="post.date"></publication-date>
        </div>
      </div>

      <buble-menu
        :opened="dotMenuOpened"
        @open="openDotMenu"
        @close="closeDotMenu"
        @deletePost="$emit('deletePost', post.id)"
      ></buble-menu>
    </div>

    <div class="post_text">{{ post.text }}</div>

    <image-block :images="post.images" :staticSrc="staticSrc"></image-block>
  </div>
</template>

<script type="text/javascript">
  import ImageBlock from "@/components/PostComponents/ImageBlock.vue"
  import GoneTimeParser from "@/components/PostComponents/GoneTimeParser.vue"
  import BubleMenu from "@/components/PostComponents/BubleMenu.vue"

  export default {
    props: {
      "userName": { type: String, default: "" },
      "userSurname": { type: String, default: "" },
      "staticSrc": { type: String, default: "/" },
      "post": { type: Object, default: {} },
    },

    data(){
      return { dotMenuOpened: false }
    },

    components: {
      "image-block": ImageBlock,
      "publication-date": GoneTimeParser,
      "buble-menu": BubleMenu
    },

    methods:{
      postClick(e){
        let clickPath = e.path.map(d => d.id)
        let clickedOn = (id)=>{ return clickPath.indexOf(id) != -1 }

        if ( !clickedOn("bubleMenu") && !clickedOn("bubleButton") && this.dotMenuOpened ){
          this.closeDotMenu()
        }
      },

      openDotMenu(){ this.dotMenuOpened = true },
      closeDotMenu(){ this.dotMenuOpened = false },
    }
  }
</script>

<style>
  .post_block{
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: fit-content(100%);
    row-gap: 2rem;

    padding: 2rem;
    font-size: 1rem;

    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 2px rgb(34 60 80 / 10%)
  }

  .post_top_nav, .post_info, .text_user_info{ font-size: inherit }

  .post_top_nav{
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: fit-content(300px);
  }

  .post_info{
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-self: start;
  }

  .short_avatar{
    width: 8vw !important;
    height: 8vw !important;
  }

  .text_user_info{
    display: grid;
    grid-template-rows: fit-content(50%) fit-content(50%);
    gap: 0.5rem;
    margin-left: 1rem;
  }

  .name{ font-size: 0.9em }

  .publication_date{
    color: #959595;
    font-size: 0.8em;
  }

  .post_text{ font-size: 1em }


  @media all and (max-width: 700px){
    .post_block{
      padding: 1rem;
      row-gap: 1rem;
    }

    .post_text{
      font-size: 0.9em;
    }
  }

  @media all and (max-width: 950px){
    .short_avatar{
      width: 55px !important;
      height: 55px !important;
    }
  }

  @media all and (max-width: 1500px) and (min-width: 800px) {
    .post_block{ font-size: 1.2rem }
  }

  @media all and (min-width: 1500px) {
    .post_block{ font-size: 1.5rem }
  }

  @media all and (min-width: 1800px) {
    .post_block{ font-size: 1.8rem }
  }

  @media all and (min-width: 2200px) {
    .post_block{ font-size: 2rem }
  }
</style>
