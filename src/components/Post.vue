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
      :postId="post.id"
      :images="post.images"
      :staticSrc="staticSrc"

      @like="$emit('like', post.id)"
    ></small-image-block>

    <div class="post_bottom_nav">
      <div
        class="post_bottom_button like_button"
        :class="{ 'like_button_active': postLikedCheck }"
        @click="$emit( postLiked ? 'dislike' : 'like', post.id)"
      >
        {{ post.likes.length }}
      </div>
    </div>
  </div>
</template>

<style src="@/assets/css/componentsStyles/postBlock.css"></style>

<script type="text/javascript">
  import SmallImageBlock from "@/components/PostComponents/ImageBlockSmall.vue"
  import ImageBlock from "@/components/PostComponents/ImageBlock.vue"
  import GoneTimeParser from "@/components/PostComponents/GoneTimeParser.vue"
  import BubleMenu from "@/components/PostComponents/BubleMenu.vue"

  import Helpers from "@/utils/helpers.js"

  const binarySearch = Helpers.binarySearch

  export default {
    props: {
      "usertype": { type: String, default: "" },
      "userName": { type: String, default: "" },
      "userSurname": { type: String, default: "" },

      "currentUserTag": { type: String, default: "" },
      "staticSrc": { type: String, default: "/" },
      "post": { type: Object, default: {} },
    },

    emits: [ 'deletePost', 'selectImageGroup', 'like', 'dislike' ],

    data(){
      return {
        dotMenuOpened: false,
        postLiked: false,
      }
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
    },

    computed: {
      postLikedCheck(){
        let userLikeIndex = binarySearch(this.post.likes, this.currentUserTag, "user_tag")

        this.postLiked = userLikeIndex != -1

        return this.postLiked
      },
    },
  }
</script>
