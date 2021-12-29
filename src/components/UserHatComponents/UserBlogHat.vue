<template>
  <div class="user_header">
    <div class="user_hat_inner align center">
      <img :src="'/img/' + user.hatPic.filename" class="user_hat">
    </div>

    <div class="user_info column align">
      <div class="avatar_inner align center">
        <img :src="'/img/' + user.avatar.filename" class="avatar">
      </div>

      <div class="user_text_info column">
        <div class="user_name">{{ user.name + ' ' + user.surname }}</div>
        <div class="user_tag">{{ user.tag }}</div>
        <div class="user_description">{{ user.description }}</div>

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

  export default {
    props: { "user": { type: Object, default: {} } },

    components: {
      "stat-view": StatisticViewer,
    }
  }
</script>
