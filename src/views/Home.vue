<template>
  <fullscreen-mode-component
    :images="fullscreen.images"
    :fullscreenMode="fullscreen.isActive"
    :index="fullscreen.index"

    @exitFullscreen="fullscreenModeOff"
    @changeImage="changeGaleryMainImage"
  ></fullscreen-mode-component>

  <blog-hat :user="user" :staticSrc="apiUrl"></blog-hat>

  <central-button @click="showPostCreationField"></central-button>

  <post-creation-field
    :userId="user && user.id ? user.id : null"
    :hided="postCreationFieldHided"

    @createPost="createPost"
    @hideField="hidePostCreationField"
  ></post-creation-field>

  <div class="container" v-if="user && user.posts">
    <post-block
      v-for="postObj in user.posts"
      :key="postObj.id"
      :staticSrc="apiUrl"
      :ownerName="user.name"
      :ownerSurname="user.surname"
      :ownerAvatarFilename="user.avatar ? user.avatar.filename : null"
      :post="postObj"

      @openInFullscreen="fullscreenModeOn"
      @setImageGroup="selectImageGroup"
    ></post-block>

    <!--<img src="@/assets/user_hats/rei_swimming.jpg">-->

  </div>

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
  import UserBlogHat from '@/components/UserHatComponents/UserBlogHat.vue'
  import CentralButton from '@/components/CentralButton.vue'
  import PostCreationField from '@/components/PostCreationField.vue'
  import PostComponent from '@/components/PostComponents/MainPostComponent.vue'
  import FullScreenModeComponent from '@/components/FullScreenModeComponent.vue'
  import Alerter from "@/components/Alerter.vue"

  import Helpers from "@/utils/helpers.js"

  const jsonPostRequest = Helpers.jsonPostRequest
  const jsonBodyRequest = Helpers.jsonBodyRequest
  const apiUrl = Helpers.apiUrl

  export default {
    data(){
      return {
        alerterActive: false,
        alerterText: "",

        user: null,
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
      "blog-hat": UserBlogHat,
      "post-block": PostComponent,
      "fullscreen-mode-component": FullScreenModeComponent,
      "central-button": CentralButton,
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
        this.changeGaleryMainImage(start)
      },

      changeGaleryMainImage(index){
        this.fullscreen.index = index
      },

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
      }
    },

    async created(){
      let auth = {}

      if (window.localStorage) {
        auth.authKey = window.localStorage.getItem('authKey')
        auth.tagname = window.localStorage.getItem('tagname')
      }

      if ( Object.keys(auth).length != 2 ){
        this.$router.push("/signin"); return
      }

      let res = await jsonPostRequest(`${ apiUrl }/`, auth)
      let user = await res.json()

      if ( !user || Object.keys(user) == 0 ){
        this.$router.push("/signin"); return
      }

      this.user = user
    }
  }

</script>
