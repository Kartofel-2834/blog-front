<template>
  <div v-if="post" class="post column">
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

        <div class="post_buble_menu_inner grid_layout_inner">
          <div class="grid_layout_element" style="z-index: 20" @click="openBubleMenu">
            <div class="buble_inner column">
              <div class="just_buble"></div>
              <div class="just_buble"></div>
              <div class="just_buble"></div>
            </div>
          </div>

          <div class="buble_menu" :class="{ 'buble_menu_opened': bubleMenuOpened }"></div>
        </div>

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

  export default {
    props: {
      "post": { type: Object, default: {} },
      "staticSrc": { type: String, default: "" },
      "ownerName": { type: String, default: "" },
      "ownerSurname": { type: String, default: "" },
      "ownerAvatarFilename": { type: String, default: "" },
    },

    emits: [ "openInFullscreen", "setImageGroup" ],

    data(){ return { bubleMenuOpened: false } },

    methods: {
      openBubleMenu(){ this.bubleMenuOpened = true },

      fullscreenModeOn(){ this.$emit('openInFullscreen') },

      selectImageGroup(images, start){
        this.$emit('setImageGroup', images, start)
      },
    },

    components: {
      "avatar": Avatar,
      "gone-time-parser": GoneTimeParser,
      "image-block": ImageBlock,
    },
  }
</script>
