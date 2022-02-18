<template>
  <div class="options_wrapper">
    <div class="options_header">Options</div>

    <div class="options_inner">
      <div class="options_top_part">
        <div class="options_user_info_inner">
          <div class="avatar_change_inner">
            <div class="options_avatar_inner">
              <!--<img src="@/assets/icons/avatar.svg" class="avatar">-->
            </div>
          </div>

          <div class="options_user_info">
            <div class="options_user_name">{{ user.name }} {{ user.surname }}</div>
            <div class="simple_text">Add info about you:</div>
          </div>
        </div>

        <post-watchers-selector></post-watchers-selector>

      </div>


      <div class="options_changers">
        <div class="options_input_inner">
          <div class="options_input_label">Name</div>
          <input class="options_input" type="text" :value="user.name">
        </div>

        <div class="options_input_inner">
          <div class="options_input_label">Surame</div>
          <input class="options_input" type="text" :value="user.surname">
        </div>

        <div class="options_input_inner">
          <div class="options_input_label">Tagname</div>
          <input class="options_input" type="text" :value="user.tagname">
        </div>

        <div class="options_input_inner">
          <div class="options_input_label">Mail</div>
          <input class="options_input" type="text" :value="user.mail">
        </div>

        <div class="options_input_inner">
          <div class="options_input_label">Token</div>
          <input class="options_input" type="text" value="">
        </div>
      </div>
    </div>
  </div>

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
  import PostWatchersSelector from "@/components/PostWatchersSelector.vue"

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
      "post-watchers-selector": PostWatchersSelector,
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
