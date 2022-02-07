<template>
  <div class="main_user_info" v-if="user || user.id">
    <div class="info_el avatar_inner">
      <!--<img src="@/assets/icons/avatar.svg" class="avatar">-->
    </div>

    <div class="info_el user_name">{{ user.name }} {{ user.surname }}</div>
    <div class="info_el user_tag">@{{ user.tagname }}</div>

    <div class="stat_row">
      <div class="stat column align">
        <div class="stat_num">{{ user.followers.length }}</div>
        <div class="stat_name">follower{{ user.followers.length == 1 ? '' : 's' }}</div>
      </div>

      <div class="stat column align">
        <div class="stat_num">{{ user.follows.length }}</div>
        <div class="stat_name">follow{{ user.follows.length == 1 ? '' : 's' }}</div>
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
      @click="$emit(currentUserFollowed ? 'unfollow' : 'follow')"
      :class="{ 'unfollow_button': currentUserFollowed }"
    >
      {{ currentUserFollowed ? 'Unfollow' : 'Follow' }}
    </div>
  </div>
</template>

<style src="@/assets/css/componentsStyles/userInfo.css"></style>

<script>
  export default {
    props: {
      "currentUserTag": { type: String, default: "" },
      "user": { type: Object, default: {} },
      "usertype": { type: String, default: "" }
    },

    emits: [ 'postCreationFieldOpen', 'follow', 'unfollow' ],

    computed: {
      currentUserFollowed(){
        let followersTags = this.user.followers.map( f => f.follower_tag )

        return followersTags.indexOf(this.currentUserTag) != -1
      }
    }
  }
</script>
