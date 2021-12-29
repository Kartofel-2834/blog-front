<template>
  <blog-hat :user="user"></blog-hat>
</template>

<script>
import UserBlogHat from '@/components/UserHatComponents/UserBlogHat.vue'

let testUser = {
  name: "Kamal",
  surname: "Demirov",
  tag: "@ananlniykudesnik",
  description: "Some information about this person",
  followers: 30,
  posts: [ "1", "2", "3" ],
}

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
