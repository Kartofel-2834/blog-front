<template>
  <blog-hat :user="user"></blog-hat>

  <div class="container">
    <post-block
      v-for="postObj in user.posts"
      :owner_name="user.name"
      :owner_surname="user.surname"
      :owner_tag="user.tag"
      :owner_avatar_filename="user.avatar.filename"
      :post="postObj"
    ></post-block>

    <!--<img src="@/assets/user_hats/rei_swimming.jpg">-->

  </div>
</template>

<script>
  import UserBlogHat from '@/components/UserHatComponents/UserBlogHat.vue'
  import PostComponent from '@/components/PostComponents/MainPostComponent.vue'

  let testPosts = [
    {
      owner_id: "123456",
      id: "111111",
      text: "Скоро выходит 41й том Берсерка, первый после смерти Миуры. Ждем.",
      date: Date.now() - 100000,
      images: [
        { post_id: "111111", filename: "berserk.png" },
      ],
    }
  ]

  let testAvatar = { owner_id: "123456", id: "321654", filename: "test_avatar.jpg" }

  let testHatPic = { owner_id: "123456", id: "654321", filename: "rei_swimming.jpg" }

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
    },

    data(){
      return {
        user: testUser,
      }
    },
  }
</script>
