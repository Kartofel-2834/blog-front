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
        :usertype="usertype"

        @open="openDotMenu"
        @close="closeDotMenu"
        @deletePost="$emit('deletePost', post.id)"
      ></buble-menu>
    </div>

    <div class="post_text">{{ post.text }}</div>

    <big-image-block
      :images="post.images"
      :staticSrc="staticSrc"
      @selectImageGroup="selectImages"
    ></big-image-block>

    <small-image-block
      :images="post.images"
      :staticSrc="staticSrc"
    ></small-image-block>
  </div>
</template>

<style src="@/assets/css/componentsStyles/postBlock.css"></style>

<script type="text/javascript">
  import SmallImageBlock from "@/components/PostComponents/ImageBlockSmall.vue"
  import ImageBlock from "@/components/PostComponents/ImageBlock.vue"
  import GoneTimeParser from "@/components/PostComponents/GoneTimeParser.vue"
  import BubleMenu from "@/components/PostComponents/BubleMenu.vue"

  export default {
    props: {
      "usertype": { type: String, default: "" },
      "userName": { type: String, default: "" },
      "userSurname": { type: String, default: "" },
      "staticSrc": { type: String, default: "/" },
      "post": { type: Object, default: {} },
    },

    emits: [ 'deletePost', 'selectImageGroup' ],

    data(){
      return { dotMenuOpened: false }
    },

    components: {
      "small-image-block": SmallImageBlock,
      "big-image-block": ImageBlock,
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

      selectImages(images, start){ this.$emit('selectImageGroup', images, start) },
    }
  }
</script>
