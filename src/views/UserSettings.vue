<template>
  <div>BEBRA</div>

  <div class="center">
    <alerter
      :text="alerterText"
      :active="alerterActive"
      @hideAlerter="hideAlerter"
    ></alerter>
  </div>
</template>

<style src="@/assets/css/settings.css"></style>

<script>
  import Alerter from "@/components/Alerter.vue"

  import Helpers from "@/utils/helpers.js"

  const jsonPostRequest = Helpers.jsonPostRequest
  const jsonBodyRequest = Helpers.jsonBodyRequest
  const getCurrentAndPageUsers = Helpers.getCurrentAndPageUsers
  const apiUrl = Helpers.apiUrl

  export default {
    data(){
      return {
        apiUrl: apiUrl,

        alerterActive: false,
        alerterText: "",

        user: null,
        currentUser: null,
        usertype: null,
      }
    },

    components: {
      "alerter": Alerter,
    },

    methods: {
      customAlert(text){
        if ( typeof text != "string" ){ return }
        this.alerterText = text
        this.alerterActive = true
      },

      hideAlerter(){ this.alerterActive = false },
    },

    async created(){
      const userTag = this.$route.params.tag

      const auth = {
        authkey: window.localStorage.getItem('authKey'),
        tagname: window.localStorage.getItem('tagname')
      }

      let answer = await getCurrentAndPageUsers(auth, userTag, this.apiUrl)

      if ( !answer.err.exist ){

        if ( answer.usertype != "owner" ){
          this.$router.push(`/${ userTag }`); return
        }

        this.currentUser = answer.currentUser
        this.user = answer.user
        this.usertype = answer.usertype
        return
      }

      let err = answer.err.solution
      let command = err.slice(0, err.indexOf("-"))
      let commandData = err.slice(err.indexOf("-") + 1, err.length)

      switch (command) {
        case "redirect": this.$router.push(commandData); break

        case "alert": this.customAlert(commandData); break
      }
    }
  }
</script>
