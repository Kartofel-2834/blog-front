<template>
  <div class="post column">
    <div class="row">
      <avatar
        :img_src="'/img/' + owner_avatar_filename"
        :frame_classes="['column', 'align', 'short_avatar_inner']"
      ></avatar>

      <div class="column">
        <div class="align post_owner_short_info">
          <div class="post_owner_name">{{ owner_name }} {{ owner_surname }}</div>
          <div class="post_owner_tag">{{ owner_tag }}</div>
        </div>

        <gone-time-parser :date="post.date"></gone-time-parser>
      </div>
    </div>

    <div class="post_text">{{ post.text }}</div>

    <image-block
      :images="post.images"
      :method_for_open_fullscreen="method_for_open_fullscreen"
      :select_image_group_method="select_image_group_method"
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
      "owner_name": { type: String, default: "" },
      "owner_surname": { type: String, default: "" },
      "owner_tag": { type: String, default: "" },
      "owner_avatar_filename": { type: String, default: "" },
      "method_for_open_fullscreen": { type: Function, default: ()=>{} },
      "select_image_group_method": { type: Function, default: ()=>{} },
    },

    components: {
      "avatar": Avatar,
      "gone-time-parser": GoneTimeParser,
      "image-block": ImageBlock,
    },
  }
</script>
