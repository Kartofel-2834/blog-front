<template>
  <fullscreen-mode-component
    :images="fullscreen.images"
    :fullscreen_mode="fullscreen.isActive"
    :method_for_close_fullscreen="fullscreenModeOff"
    :index="fullscreen.index"
    :image_change_method="changeGaleryMainImage"
  ></fullscreen-mode-component>

  <blog-hat :user="user" :static_src="apiUrl"></blog-hat>

  <!--
  <central-button @click="aboba"></central-button>
  -->
  <central-button @click="showPostCreationField"></central-button>

  <post-creation-field
    :hide_field_method="hidePostCreationField"
    :hided="postCreationFieldHided"
  ></post-creation-field>

  <div class="container" v-if="user && user.posts">
    <post-block
      v-for="postObj in user.posts"
      :static_src="apiUrl"
      :owner_name="user.name"
      :owner_surname="user.surname"
      :owner_tag="user.tag"
      :owner_avatar_filename="user.avatar ? user.avatar.filename : null"
      :post="postObj"
      :method_for_open_fullscreen="fullscreenModeOn"
      :select_image_group_method="selectImageGroup"
    ></post-block>

    <!--<img src="@/assets/user_hats/rei_swimming.jpg">-->

  </div>
</template>

<style src="@/assets/css/home.css"></style>

<script>
  import UserBlogHat from '@/components/UserHatComponents/UserBlogHat.vue'
  import CentralButton from '@/components/CentralButton.vue'
  import PostCreationField from '@/components/PostCreationField.vue'
  import PostComponent from '@/components/PostComponents/MainPostComponent.vue'
  import FullScreenModeComponent from '@/components/FullScreenModeComponent.vue'

  import Helpers from "@/utils/helpers.js"

  const jsonPostRequest = Helpers.jsonPostRequest
  const jsonBodyRequest = Helpers.jsonBodyRequest
  const apiUrl = Helpers.apiUrl

  export default {
    data(){
      return {
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
    },

    methods: {
      async aboba(){
        let res = await this.createPost({
          owner_id: this.user.id,
          text: `Это тестовая запись #${ this.user.posts.length+1 }`,
          abobus: "1232r23"
        })
        console.log(res)
      },

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
        return await jsonBodyRequest(`${ apiUrl }/post`, "PUT", putData)
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
        ans.images = [ { filename: "snake.png" }, { filename: "111.jpg" } ]
        return ans
      }).reverse()

      this.user = user
    }
  }

</script>
