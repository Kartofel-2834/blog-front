<template>
  <div class="psevdo_body align center">
    <div class="reg_container column align">
      <h1 class="title column align">Sign in</h1>

      <alerter
        :text="alerterText"
        :alert_method="customAlert"
        :alerter_hide_method="hideAlerter"
        :active="alerterActive"
      ></alerter>

      <div class="inputs_inner column">
        <text-input-form
          title="mail"
          :value="mail"
          :input_listener="inputListener"
        ></text-input-form>

        <password-input
          :value="password"
          :input_listener="passwordInputListener"
        ></password-input>
      </div>

      <div class="button submit_button" @click="submitButtonClickListener">let's go</div>
      <a class="link column align" href="/password-recovery">Forgot password?</a>
    </div>
  </div>

</template>

<style src="@/assets/css/registration.css"></style>

<script>
  import PasswordInput from "@/components/PasswordInput.vue"
  import TextInput from "@/components/TextInput.vue"
  import Alerter from "@/components/Alerter.vue"
  import Helpers from "@/utils/helpers.js"

  const jsonPostRequest = Helpers.jsonPostRequest
  const apiUrl = "http://localhost:3000"

  export default {
    components: {
      "text-input-form": TextInput,
      "alerter": Alerter,
      "password-input": PasswordInput,
    },

    data(){
      return {
        alerterActive: false,
        alerterText: "",

        mail: "",
        password: "",
      }
    },

    methods: {
      customAlert(text){
        if ( typeof text != "string" ){ return }
        this.alerterText = text
        this.alerterActive = true
      },

      hideAlerter(){ this.alerterActive = false },

      inputListener(e, key){ this[key] = e.target.value },

      passwordInputListener(e){ this.password = e.target.value },

      async submitButtonClickListener(e){
        if( !/[a-z]@[a-z]/.test(this.mail) || this.password.length < 6 ){ return }

        let res = await jsonPostRequest(`${ apiUrl }/signin`, { mail: this.mail, password: this.password })

        if ( Math.floor(res.status / 100) != 2 ){
          let resText = await res.text()
          this.customAlert( resText ? resText : res.statusText )
          return
        }

        let resJson = await res.json()

        if ( !resJson || !resJson.authKey || !resJson.tagname ){
          this.customAlert("Something went wrong. Try again"); return
        }

        if (window.localStorage) {
          window.localStorage.setItem('authKey', resJson.authKey)
          window.localStorage.setItem('tagname', resJson.tagname)
        }

        this.$router.push(`/`)
      },
    },
  }
</script>
