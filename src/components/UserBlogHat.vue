<template>
  <div class="user_header">
    <div class="user_hat_inner align center">
      <img src="@/assets/user_hats/rei_swimming.jpg" class="user_hat">
    </div>

    <div class="user_info column align">
      <div class="avatar_inner align center">
        <img src="@/assets/avatars/test_avatar.jpg" class="avatar">
      </div>

      <div class="user_text_info column">
        <div class="user_name">{{ user.name + ' ' + user.surname }}</div>
        <div class="user_tag">{{ user.tag }}</div>
        <div class="user_description">{{ user.description }}</div>

        <div class="user_stats space_between">
          <div class="user_stat_el column align">
            <div class="user_stat_count">{{ user.followers }}</div>
            <div class="user_stat_name">Followers</div>
          </div>

          <div class="user_stat_el column align">
            <div class="user_stat_count">{{ user.posts.length }}</div>
            <div class="user_stat_name">Posts</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    props: {
      "user": { type: Object, default: {} },
    },
  }
</script>
