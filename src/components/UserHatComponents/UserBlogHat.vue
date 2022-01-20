<template>
  <div class="user_header" v-if="user">
    <div class="user_hat_inner align center">
      <img v-if="user.hatPic" :src="staticSrc + '/hat_pictures/' + user.hatPic.filename" class="user_hat">
    </div>

    <div class="user_info column align">
      <avatar
        v-if="user.avatar"
        :img_src="staticSrc + '/avatars/' + user.avatar.filename"
        :frame_classes="['column', 'align']"
      ></avatar>

      <div v-else class="avatar_inner column align default_avatar"></div>

      <div class="user_text_info column">
        <div class="user_name">{{ user.name }} {{ user.surname }}</div>
        <div class="user_tag">@{{ user.tagname }}</div>
        <div v-if="user.description" class="user_description">{{ user.description }}</div>

        <div class="user_stats space_between">
          <stat-view title="Followers" :count="user.followers"></stat-view>
          <stat-view title="Posts" :count="user.posts.length"></stat-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import StatisticViewer from "./UserStatisticViewer.vue"
  import Avatar from "@/components/Avatar.vue"

  export default {
    props: {
      "user": { type: Object, default: null },
      "staticSrc": { type: String, default: "" }
    },

    components: {
      "stat-view": StatisticViewer,
      "avatar": Avatar,
    },

    created(){

    }
  }
</script>
