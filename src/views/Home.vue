<template>
  <div class="blog_hat"></div>

  <fullscreen-images
    :images="fullscreen.images"
    :opened="fullscreen.isActive"
    :index="fullscreen.index"

    @open="fullscreenModeOn"
    @close="fullscreenModeOff"
    @setIndex="changeGaleryMainImage"
  ></fullscreen-images>

  <div class="wrapper">
    <main-user-info v-if="user"
      :currentUserTag="currentUser.tagname"
      :user="user"
      :usertype="usertype"

      @follow="follow"
      @unfollow="unfollow"
      @postCreationFieldOpen="showPostCreationField"
    ></main-user-info>

    <post
      v-if="user && user.posts"
      v-for="post in user.posts"
      :post="post"
      :key="post.id"
      :userName="user.name"
      :userSurname="user.surname"
      :staticSrc="apiUrl"
      :usertype="usertype"

      @deletePost="deletePost"
      @selectImageGroup="selectImageGroup"
    ></post>
  </div>

  <post-creation-field v-if="usertype == 'owner'"
    :userId="user && user.id ? user.id : null"
    :hided="postCreationFieldHided"

    @createPost="createPost"
    @hideField="hidePostCreationField"
  ></post-creation-field>

  <div class="center">
    <alerter
      :text="alerterText"
      :active="alerterActive"
      @hideAlerter="hideAlerter"
    ></alerter>
  </div>
</template>

<style src="@/assets/css/home.css"></style>

<script>
  import MainUserInfo from "@/components/UserInfo.vue"
  import PostBlock from "@/components/Post.vue"
  import FullscreenImages from "@/components/FullscreenImages.vue"

  import PostCreationField from '@/components/PostCreationField.vue'
  import Alerter from "@/components/Alerter.vue"

  import Helpers from "@/utils/helpers.js"

  const jsonPostRequest = Helpers.jsonPostRequest
  const jsonBodyRequest = Helpers.jsonBodyRequest
  const apiUrl = Helpers.apiUrl

  export default {
    data(){
      return {
        auth: null,
        alerterActive: false,
        alerterText: "",

        user: null,
        currentUser: null,

        usertype: null,
        postCreationFieldHided: true,
        apiUrl: apiUrl,

        fullscreen: {
          isActive: false,
          images: [],
          index: 0,
        },
      }
    },

    components: {
      "main-user-info": MainUserInfo,
      "post": PostBlock,
      "fullscreen-images": FullscreenImages,
      "post-creation-field": PostCreationField,
      "alerter": Alerter,
    },

    methods: {
      customAlert(text){
        if ( typeof text != "string" ){ return }
        this.alerterText = text
        this.alerterActive = true
      },

      hideAlerter(){ this.alerterActive = false },

      fullscreenModeOn(){ this.fullscreen.isActive = true },
      fullscreenModeOff(){ this.fullscreen.isActive = false },

      selectImageGroup(images, start){
        this.fullscreen.images = images.map( i => `${ this.apiUrl }/post_images/${ i.filename }` )
        this.fullscreenModeOn()
        this.changeGaleryMainImage(start)
      },

      changeGaleryMainImage(index){ this.fullscreen.index = index },

      showPostCreationField(){ this.postCreationFieldHided = false },
      hidePostCreationField(){ this.postCreationFieldHided = true },

      async createPost(putData){
        let res = await fetch(`${ apiUrl }/post`, { method: "PUT", body: putData })

        if ( Math.floor(res.status / 100) == 2 ){
          let createdPost = await res.json()

          if (!createdPost || !createdPost.created){ return }

          this.user.posts.unshift(createdPost.created)

          this.customAlert("Post created")
          this.hidePostCreationField()
        } else {
          this.customAlert(await res.text())
        }

        return res.status
      },

      async deletePost(id){
        let postsIds = this.user.posts.map( p => p.id )
        let index = postsIds.indexOf(id)

        if ( index == -1 ){
          this.customAlert("Failed to delete post"); return
        }

        this.user.posts.splice(index, 1)

        let res = await jsonBodyRequest(`${ apiUrl }/post`, "DELETE", { postId: id })
      },

      async follow(){
        if ( !this.auth || !this.auth.tagname || !this.auth.authkey ){ return }

        let res = await jsonPostRequest(`${ apiUrl }/follow`, {
          followerTag: this.currentUser.tagname,
          followerAuthkey: this.auth.authkey,
          blogId: this.user.id,
        })

        if( Math.floor(res.status / 100) != 2 ){
          this.customAlert("Error. Not followed"); return
        }

        this.customAlert("Follow success")

        let followedUser = await res.json()

        this.user.followers.push(followedUser)
      },

      async unfollow(){
        if ( !this.auth || !this.auth.tagname || !this.auth.authkey ){ return }

        let res = await jsonBodyRequest(`${ apiUrl }/follow`, "DELETE", {
          followerTag: this.currentUser.tagname,
          blogId: this.user.id,
        })

        if( Math.floor(res.status / 100) != 2 ){
          let err = await res.text()
          this.customAlert(err); return
        }

        this.customAlert("Unfollowed")

        let followers = this.user.followers
        let followerIndex = followers.map( f => f.follower_tag ).indexOf(this.currentUser.tagname)

        followers.splice(followerIndex, 1)
      },
    },

    async created(){
      const userTag = this.$route.params.tag

      let auth = {
        authkey: window.localStorage.getItem('authKey'),
        tagname: window.localStorage.getItem('tagname')
      }

      if ( !auth.authkey || !auth.tagname ){ this.$router.push("/signin"); return }

      this.auth = auth

      if ( !userTag || userTag.length == 0 ){ document.location.href = `/${ auth.tagname }` }

      let res = await jsonPostRequest(`${ apiUrl }/`, auth)

      if ( Math.floor(res.status / 100) == 2 ){
        res = await res.json()
      } else {
        this.$router.push("/signin"); return
      }

      if ( res.type && res.type == 'owner' ){
        this.currentUser = res.user && res.user.id ? res.user : null

        if ( this.currentUser && res.user.tagname == userTag ){
          this.user = res.user
          this.usertype = 'owner'
          return
        }
      } else {
        this.$router.push("/signin"); return
      }

      res = await jsonPostRequest(`${ apiUrl }/`, { tagname: userTag })

      if ( Math.floor(res.status / 100) == 2 ){
        res = await res.json()
      } else {
        this.$router.push("/signin"); return
      }

      if ( res.user && res.user.id ){
        this.user = res.user
        this.usertype = res.type
      } else {
        this.customAlert("Oops! Something went wrong. We can't get this user")
      }
    }
  }
</script>
