<template>
  <div class="blog_hat"></div>

  <main-menu
    v-if="currentUser"
    :user="currentUser"

    @exit="exitAccount"
  ></main-menu>

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
      :staticSrc="apiUrl"
      :currentUserTag="currentUser.tagname"

      :usertype="usertype"
      :userId="user.id"
      :userName="user.name"
      :userSurname="user.surname"

      @like="likePost"
      @dislike="dislikePost"
      @deletePost="deletePost"
      @selectImageGroup="selectImageGroup"
    ></post>
  </div>

  <post-creation-field v-if="usertype == 'owner'"
    :authkey="currentUser && currentUser.authkey ? currentUser.authkey : null"
    :userId="currentUser && currentUser.id ? currentUser.id : null"
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
  import MainMenu from "@/components/MainMenu.vue"
  import MainUserInfo from "@/components/UserInfo.vue"
  import PostBlock from "@/components/Post.vue"
  import FullscreenImages from "@/components/FullscreenImages.vue"

  import PostCreationField from '@/components/PostCreationField.vue'
  import Alerter from "@/components/Alerter.vue"

  import Helpers from "@/utils/helpers.js"

  const jsonPostRequest = Helpers.jsonPostRequest
  const jsonBodyRequest = Helpers.jsonBodyRequest
  const getCurrentAndPageUsers = Helpers.getCurrentAndPageUsers
  const binarySearch = Helpers.binarySearch
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
      "main-menu": MainMenu,
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

          console.log(createdPost)

          this.currentUser.posts.unshift(createdPost.created)

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

        let res = await jsonBodyRequest(`${ apiUrl }/post`, "DELETE", {
          postId: id,
          userId: this.currentUser.id,
          authkey: this.currentUser.authkey
        })
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

      async likePost(postId){
        if ( !postId ){ return }

        let postIndex = this.user.posts.map( p => p.id ).indexOf(postId)
        let likes = this.user.posts[postIndex].likes

        let likeIndex = binarySearch(likes, this.currentUser.tagname, "user_tag")

        if ( likeIndex != -1 ){ return }

        let res = await jsonPostRequest(`${ apiUrl }/like`, {
          userTag: this.currentUser.tagname,
          ownerTag: this.user.tagname,
          authkey: this.currentUser.authkey,
          postId: postId,
        })

        if ( Math.floor(res.status / 100) != 2 ){
          this.customAlert( await res.text() ); return
        }

        let ans = await res.json()

        if ( !ans ){ return }

        this.user.posts[postIndex].likes = ans
      },

      async dislikePost(postId){
        if ( !postId ){ return }

        let res = await jsonBodyRequest(`${ apiUrl }/like`, "DELETE", {
          userTag: this.currentUser.tagname,
          authkey: this.currentUser.authkey,
          postId: postId,
        })

        if ( Math.floor(res.status / 100) != 2 ){
          this.customAlert( await res.text() ); return
        }

        let postIndex = -1

        for ( let p=0; p < this.user.posts.length; p++ ){
          if ( this.user.posts[p].id == postId ){
            postIndex = p; break
          }
        }

        let likes = this.user.posts[postIndex].likes
        let likeIndex = binarySearch(likes, this.currentUser.tagname, "user_tag")

        this.user.posts[postIndex].likes.splice(likeIndex, 1)
      },

      async exitAccount(){
        let res = await jsonPostRequest(`${ apiUrl }/exitAccount`, {
          id: this.currentUser.id,
          tagname: this.currentUser.tagname,
          authkey: this.currentUser.authkey,
        })

        if ( Math.floor(res.status / 100) == 2 ){
          this.$router.push("/signin"); return
        }

        this.customAlert( await res.text() )
      }
    },

    async created(){
      const userTag = this.$route.params.tag

      const auth = {
        authkey: window.localStorage.getItem('authKey'),
        tagname: window.localStorage.getItem('tagname')
      }

      let answer = await getCurrentAndPageUsers(auth, userTag, this.apiUrl)

      if ( !answer.err.exist ){
        this.currentUser = answer.currentUser
        this.user = answer.user
        this.usertype = answer.usertype
        return
      }

      let err = answer.err.solution
      let command = err.slice(0, err.indexOf("-"))
      let commandData = err.slice(err.indexOf("-") + 1, err.length)

      switch (command) {
        case "strict_redirect": document.location.href = commandData; break;

        case "redirect": this.$router.push(commandData); break

        case "alert": this.customAlert(commandData); break
      }
    }
  }
</script>
