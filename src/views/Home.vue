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
      :user="user"
      :usertype="usertype"

      @follow="follow"
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
          followerTag: this.auth.tagname,
          followerAuthkey: this.auth.authkey,
          blogId: this.user.id,
        })

        alert(res.status)
      }
    },

    async created(){
      const userTag = this.$route.params.tag
      let auth = {}

      if (window.localStorage) {
        auth.authkey = window.localStorage.getItem('authKey')
        auth.tagname = window.localStorage.getItem('tagname')
      }

      if ( Object.keys(auth).length != 2 ){
        this.$router.push("/signin"); return
      } else if ( !userTag || userTag.length == 0 ) {
        document.location.href = `/${ auth.tagname }`; return
      }

      let res = null
      this.auth = auth

      if( userTag == auth.tagname ){
        res = await jsonPostRequest(`${ apiUrl }/`, auth)
      } else {
        res = await jsonPostRequest(`${ apiUrl }/`, { tagname: userTag })
      }

      if ( Math.floor(res.status/100) != 2 ){
        this.$router.push("/signin"); return
      }

      let answer = await res.json()

      if ( !answer.user || !answer.type ){
        this.$router.push("/signin"); return
      }

      this.user = answer.user
      this.usertype = answer.type
      this.authkey = auth.authkey
      console.log(answer)
    }
  }
</script>
