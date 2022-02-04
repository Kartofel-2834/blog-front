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
        <div class="stat_num">0</div>
        <div class="stat_name">follows</div>
      </div>
    </div>

    <div class="button main_page_button" @click="$emit('postCreationFieldOpen')">New post</div>
  </div>
</template>

<script>
  export default {
    props: { "user": { type: Object, default: {} } },

    emits: ['postCreationFieldOpen']
  }
</script>


<style>
  .main_user_info{
    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: 1rem;
  }

  .avatar{
    width: 100%;
    height: auto;
  }

  .user_name{
    font-weight: 600;
    margin-top: 1rem;
    font-size: 1.3em;
  }

  .user_tag{
    font-size: 1em;
    margin-top: 0.5rem;
    color:grey;
  }

  .stat_row{
    display: flex;
    font-size: 1rem;
    margin-top: 1.5rem;
  }

  .stat{
    margin-left: 2rem;
    font-size: inherit;
  }

  .stat:first-child{ margin-left: 0 }

  .stat_num{
    font-size: 1.5em;
    font-weight: 600;
  }

  .stat_name{
    font-size: 0.7em;
    text-transform: uppercase;
    font-weight: 500;
  }

  .main_page_button{
    font-size: 1rem;
    margin: 2rem auto;
  }

  @media all and (max-width: 700px){
    .main_user_info, .stat_row{ font-size: 0.9rem }

    .main_page_button{
      font-size: 1.1rem;
      padding: 1rem 2rem;
      margin: 1.5rem auto;
    }
  }

  @media all and (max-width: 950px){
     .main_user_info, .stat_row{ font-size: 1.1rem }
  }

  @media all and (min-width: 1400px){
    .main_user_info{ font-size: 1.3rem }

    .main_page_button{
      font-size: 1.4rem;
      padding: 1.2rem 2.7rem;
    }
  }

  @media all and (min-width: 1800px){
    .main_user_info{ font-size: 1.5rem }
  }

  @media all and (min-width: 2200px){
    .main_user_info, .stat_row{ font-size: 2rem }

    .main_page_button{
      font-size: 2rem;
      padding: 1.5rem 4rem;
      margin: 4rem auto;
    }
  }
</style>
