<template>
  <fullscreen-mode-component
    :images="fullscreen.images"
    :fullscreen_mode="fullscreen.isActive"
    :method_for_close_fullscreen="fullscreenModeOff"
    :index="fullscreen.index"
    :image_change_method="changeGaleryMainImage"
  ></fullscreen-mode-component>

  <blog-hat :user="user"></blog-hat>

  <central-button @click="showPostCreationField"></central-button>

  <post-creation-field
    :hide_field_method="hidePostCreationField"
    :hided="postCreationFieldHided"
  ></post-creation-field>

  <div class="container">
    <post-block
      v-for="postObj in user.posts"
      :owner_name="user.name"
      :owner_surname="user.surname"
      :owner_tag="user.tag"
      :owner_avatar_filename="user.avatar.filename"
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
  import PostComponent from '@/components/PostComponents/MainPostComponent.vue'
  import FullScreenModeComponent from '@/components/FullScreenModeComponent.vue'
  import CentralButton from '@/components/CentralButton.vue'
  import PostCreationField from '@/components/PostCreationField.vue'

  let testPosts = [
    {
      owner_id: "123456",
      id: "111111",
      text: "Скоро выходит 41й том Берсерка, первый после смерти Миуры. Ждем.",
      date: Date.now() - 100000,
      images: [
        { id: "987126", post_id: "111111", filename: "berserk.png", ext: "png" },
      ],
    },

    {
      owner_id: "123456",
      id: "222222",
      text: "Просто фото котят",
      date: Date.now() - 10000000,
      images: [
        { id: "615379", post_id: "222222", filename: "kitten_4.jpg", ext: "jpg" },
        { id: "236455", post_id: "222222", filename: "kitten_1.jpg", ext: "jpg" },
        { id: "368722", post_id: "222222", filename: "kitten_2.jpg", ext: "jpg" },
        { id: "386821", post_id: "222222", filename: "kitten_3.jpg", ext: "jpg" },
        { id: "386821", post_id: "222222", filename: "kitten_5.jpg", ext: "jpg" },
        { id: "386821", post_id: "222222", filename: "kitten_6.jpg", ext: "jpg" },
        { id: "386821", post_id: "222222", filename: "kitten_7.jpg", ext: "jpg" },
        { id: "386821", post_id: "222222", filename: "kitten_8.jpg", ext: "jpg" },
        { id: "386821", post_id: "222222", filename: "kitten_9.jpg", ext: "jpg" },
        { id: "386821", post_id: "222222", filename: "kitten_10.jpg", ext: "jpg" },
        { id: "386821", post_id: "222222", filename: "kitten_11.jpg", ext: "jpg" },
      ],
    },

    {
      owner_id: "123456",
      id: "333333",
      text: "Let's celebrate and suck some dick",
      date: Date.now() - 100000000,
      images: [
        { id: "683682", post_id: "333333", filename: "gachi_1.jpg", ext: "jpg" },
        { id: "157926", post_id: "333333", filename: "gachi_2.jpg", ext: "jpg" },
        { id: "987642", post_id: "333333", filename: "gachi_3.jpg", ext: "jpg" },
      ],
    },

    {
      owner_id: "123456",
      id: "444444",
      text: null,
      date: Date.now() - 1000000000,
      images: [
        { id: "298323", post_id: "444444", filename: "bleach_1.jpg", ext: "jpg" },
        { id: "457687", post_id: "444444", filename: "bleach_2.jpg", ext: "jpg" },
      ],
    },
  ]

  let testAvatar = { owner_id: "123456", id: "321654", filename: "test_avatar.jpg", ext: "jpg" }

  let testHatPic = { owner_id: "123456", id: "654321", filename: "rei_swimming.jpg", ext: "jpg" }

  let testUser = {
    id: "123456",
    name: "Kamal",
    surname: "Demirov",
    tag: "@ananlniydeboshir",
    description: "Some information about this person",
    followers: 30,
    posts: testPosts,
    avatar: testAvatar,
    hatPic: testHatPic,
  }

  ////////////////////////////////////////////////////////////////////////////

  export default {
    components: {
      "blog-hat": UserBlogHat,
      "post-block": PostComponent,
      "fullscreen-mode-component": FullScreenModeComponent,
      "central-button": CentralButton,
      "post-creation-field": PostCreationField,
    },

    data(){
      return {
        user: testUser,
        fullscreen: {
          isActive: false,
          images: [],
          index: 0,
        },

        postCreationFieldHided: true,
      }
    },

    methods: {
      fullscreenModeOn(){ this.fullscreen.isActive = true },
      fullscreenModeOff(){ this.fullscreen.isActive = false },



      selectImageGroup(images, start){
        this.fullscreen.images = images
        this.changeGaleryMainImage(start)
      },

      changeGaleryMainImage(index){
        this.fullscreen.index = index
      },

      showPostCreationField(){ this.postCreationFieldHided = false },
      hidePostCreationField(){ this.postCreationFieldHided = true },
    }
  }
</script>
