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

        <div class="publication_date">{{ post.date }}</div>
      </div>
    </div>

    <div class="post_text">{{ post.text }}</div>
    <img :src="'/img/' + post.images[0].filename" class="post_image">
  </div>
</template>

<script>
  import Avatar from "@/components/Avatar.vue"

  export default {
    props: {
      "post": { type: Object, default: {} },
      "owner_name": { type: String, default: "" },
      "owner_surname": { type: String, default: "" },
      "owner_tag": { type: String, default: "" },
      "owner_avatar_filename": { type: String, default: "" },
    },

    components: { "avatar": Avatar }
  }
</script>
