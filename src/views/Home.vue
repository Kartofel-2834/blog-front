<template>
  <fullscreen-mode-component
    :images="fullscreen.images"
    :fullscreenMode="fullscreen.isActive"
    :methodForCloseFullscreen="fullscreenModeOff"
    :index="fullscreen.index"
    :imageChangeMethod="changeGaleryMainImage"
  ></fullscreen-mode-component>

  <blog-hat :user="user" :staticSrc="apiUrl"></blog-hat>

  <central-button @click="showPostCreationField"></central-button>

  <post-creation-field
    :userId="user && user.id ? user.id : null"
    :hideFieldMethod="hidePostCreationField"
    :hided="postCreationFieldHided"
    :postSendMethod="createPost"
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
      :methodForOpenFullscreen="fullscreenModeOn"
      :selectImageGroupMethod="selectImageGroup"
    ></post-block>

    <!--<img src="@/assets/user_hats/rei_swimming.jpg">-->

  </div>

  <div class="center">
    <alerter
      :text="alerterText"
      :alertMethod="customAlert"
      :alerterHideMethod="hideAlerter"
      :active="alerterActive"
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
        let res = await jsonBodyRequest(`${ apiUrl }/post`, "PUT", putData)

        if ( Math.floor(res.status / 100) == 2 ){
          let createdPost = await res.json()

          console.log(createdPost)
          if (!createdPost || !createdPost.created){ return }

          this.user.posts.unshift(createdPost.created)


          this.customAlert("Post created")
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

      user.posts = user.posts.map( (p)=>{
        let ans = p
        ans.images = [
          { filename: "333.jpg" },
          { filename: "111.jpg" },
        ]
        return ans
      }).reverse()

      this.user = user
    }
  }

</script>
