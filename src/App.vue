<template>
  <blog-hat :user="user"></blog-hat>

  <div class="post column" v-for="post in user.posts">
    <div class="post_owner_short_info">
      <div>{{ user.name }} {{ user.surname }}</div>
      <div>{{ user.tag }}</div>
      <div>{{ post.date }}</div>
    </div>

    <div class="post_text">{{ post.text }}</div>
    <img :src="'/img/' + post.images[0].filename" alt="">
  </div>
</template>

<script>
import UserBlogHat from '@/components/UserHatComponents/UserBlogHat.vue'

let testPosts = [
  {
    owner_id: "123456",
    id: "111111",
    text: "Скоро выходит 41й том Берсерка, первый после смерти Миуры. Ждем.",
    date: Date.now() - 100_000,
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
  },

  data(){
    return {
      user: testUser,
    }
  },

}
</script>
