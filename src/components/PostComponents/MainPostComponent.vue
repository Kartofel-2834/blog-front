<template>
  <div v-if="post" class="post column" @click="postClick">
    <div class="row align">
      <avatar
        v-if="ownerAvatarFilename"
        :imgSrc="staticSrc + '/avatars/' + ownerAvatarFilename"
        :frameClasses="['column', 'align', 'short_avatar_inner']"
      ></avatar>

      <div v-else class="short_avatar_inner column align default_avatar"></div>

      <div class="post_top_nav space_between">
        <div class="column">
          <div class="align post_owner_short_info">
            <div class="post_owner_name">{{ ownerName }} {{ ownerSurname }}</div>
          </div>

          <gone-time-parser :date="Number(post.date)"></gone-time-parser>
        </div>

        <buble-menu
          @open="openBubleMenu"
          @close="closeBubleMenu"
          @deletePost="$emit('deletePost', post.id)"
          :opened="bubleMenuOpened"
        ></buble-menu>
      </div>

    </div>

    <div class="post_text">{{ post.text }}</div>

    <image-block
      :images="post.images"
      :staticSrc="staticSrc"

      @openInFullscreen="fullscreenModeOn"
      @setImageGroup="selectImageGroup"
    ></image-block>
  </div>
</template>

<script>
  import Avatar from "@/components/Avatar.vue"
  import GoneTimeParser from "./GoneTimeParser.vue"
  import ImageBlock from "./ImageBlock.vue"
  import BubleMenu from "./BubleMenu.vue"

  export default {
    props: {
      "post": { type: Object, default: {} },
      "staticSrc": { type: String, default: "" },
      "ownerName": { type: String, default: "" },
      "ownerSurname": { type: String, default: "" },
      "ownerAvatarFilename": { type: String, default: "" },
    },

    emits: [ "openInFullscreen", "setImageGroup", "deletePost" ],

    data(){ return { bubleMenuOpened: false } },

    methods: {
      postClick(e){
        let clickPath = e.path.map(d => d.id)
        let clickedOn = (id)=>{ return clickPath.indexOf(id) != -1 }

        if ( !clickedOn("bubleMenu") && !clickedOn("bubleButton") && this.bubleMenuOpened ){
          this.closeBubleMenu()
        }
      },

      openBubleMenu(){ this.bubleMenuOpened = true },
      closeBubleMenu(){ this.bubleMenuOpened = false },

      fullscreenModeOn(){ this.$emit('openInFullscreen') },

      selectImageGroup(images, start){
        this.$emit('setImageGroup', images, start)
      },


    },

    components: {
      "avatar": Avatar,
      "gone-time-parser": GoneTimeParser,
      "image-block": ImageBlock,
      "buble-menu": BubleMenu,
    },
  }
</script>
