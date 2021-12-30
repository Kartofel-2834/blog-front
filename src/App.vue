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
        { id: "987126", post_id: "111111", filename: "berserk.png", ext: "png" },
      ],
    },

    {
      owner_id: "123456",
      id: "222222",
      text: "Просто фото котят",
      date: Date.now() - 10000000,
      images: [
        { id: "236455", post_id: "222222", filename: "kitten_1.jpg", ext: "jpg" },
        { id: "368722", post_id: "222222", filename: "kitten_2.jpg", ext: "jpg" },
        { id: "386821", post_id: "222222", filename: "kitten_3.jpg", ext: "jpg" },
        { id: "615379", post_id: "222222", filename: "kitten_4.jpg", ext: "jpg" },
      ],
    },

    {
      owner_id: "123456",
      id: "333333",
      text: "Let's celebrate and suck some dick",
      date: Date.now() - 100000000,
      images: [
        { id: "683682", post_id: "222222", filename: "gachi_1.jpg", ext: "jpg" },
        { id: "157926", post_id: "222222", filename: "gachi_2.jpg", ext: "jpg" },
        { id: "987642", post_id: "222222", filename: "gachi_3.jpg", ext: "jpg" },
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
    },

    data(){
      return {
        user: testUser,
      }
    },
  }
</script>
