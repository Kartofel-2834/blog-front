<template>
  <div class="post_watchers_selector_inner">
    <div class="post_watchers_selector_title">Who can watch your posts:</div>

    <div class="post_watchers_selector_main_line" id="postWatchersSelectorLine" @click="chageOpenMode">
      <div class="post_watchers_selector_main_line_title">{{ blogTypeSwitcher }}</div>
      <div class="post_watchers_selector_arrow" :class="{ 'post_watchers_selector_arrow_active': opened }"></div>
    </div>

    <div class="post_watchers_selector_menu" id="postWatchersSelectorMenu" :class="{ 'no_scale_y': !opened }">
      <div class="post_watchers_selector" @click="changeBlogtype('all')">All</div>
      <div class="post_watchers_selector" @click="changeBlogtype('followers')">Followers</div>
      <div class="post_watchers_selector" @click="changeBlogtype('friends')">Friends</div>
      <div class="post_watchers_selector" @click="changeBlogtype('closed')">Nobody</div>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      "blogtype": { type: String, default: "all" }
    },

    data(){
      return {
        opened: false,
        currentBlogtype: this.blogtype,
      }
    },

    methods: {
      open(){ this.opened = true },
      close(){ this.opened = false },
      chageOpenMode(){ this.opened = !this.opened },

      changeBlogtype(type){
        this.currentBlogtype = type
      }
    },

    computed: {
      blogTypeSwitcher(){
        switch (this.currentBlogtype) {
          case 'closed': return "Nobody"; break;
          case 'all': return "All"; break;
          case 'followers': return "Followers"; break;
          case 'friends': return "Friends"; break;
        }
      }
    },

    created(){
      window.addEventListener("click", (e)=>{
        for ( let el of e.path ){
          if ( el.id == "postWatchersSelectorLine" || el.id == "postWatchersSelectorMenu" ){
            return
          }
        }

        this.close()
      })
    }
  }
</script>
