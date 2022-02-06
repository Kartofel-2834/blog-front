<template>
  <div class="main_user_info" v-if="user || user.id">
    <div class="info_el avatar_inner">
      <!--<img src="@/assets/icons/avatar.svg" class="avatar">-->
    </div>

    <div class="info_el user_name">{{ user.name }} {{ user.surname }}</div>
    <div class="info_el user_tag">@{{ user.tagname }}</div>

    <div class="stat_row">
      <div class="stat column align">
        <div class="stat_num">{{ user.followers }}</div>
        <div class="stat_name">follower{{ user.followers == 1 ? '' : 's' }}</div>
      </div>

      <div class="stat column align">
        <div class="stat_num">{{ user.follows }}</div>
        <div class="stat_name">follow{{ user.follows == 1 ? '' : 's' }}</div>
      </div>
    </div>

    <div v-if="usertype == 'owner'"
      class="button main_page_button"
      @click="$emit('postCreationFieldOpen')"
    >
      New post
    </div>

    <div v-else
      class="button main_page_button"
      @click="$emit('follow')"
    >
      Follow
    </div>
  </div>
</template>

<style src="@/assets/css/componentsStyles/userInfo.css"></style>

<script>
  export default {
    props: {
      "user": { type: Object, default: {} },
      "usertype": { type: String, default: "" }
    },

    emits: [ 'postCreationFieldOpen', 'follow' ]
  }
</script>
