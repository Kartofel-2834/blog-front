<template>
  <div class="psevdo_body align center">
    <div class="reg_container column align">
      <h1 class="title column align">Password recovery</h1>

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
          :value="password.text"
          :input_listener="passwordInputListener"
          :title_classes="[ password.error ? 'error_title' : '' ]"
          :placeholder="password.placeholder"
        ></password-input>

        <div class="column align" :class="{ 'height_hide': !tokenAlreadySend }" style="margin-top:3rem">
          <text-input-form
            title="token"
            :value="token"
            :input_listener="inputListener"
            :keydown_listener="tokenKeydownListener"
          ></text-input-form>

          <div class="link" @click="sendToken">Send token again</div>
        </div>

      </div>

      <div class="button submit_button" @click="submitButtonClickListener">
        {{ tokenAlreadySend ? 'Change password' : 'Send recovery token' }}
      </div>
    </div>
  </div>
</template>

<style src="@/assets/css/registration.css"></style>

<style>
  .height_hide{
    height: 0px;
    overflow: hidden;
  }
</style>

<script>
  import PasswordInput from "@/components/PasswordInput.vue"
  import TextInput from "@/components/TextInput.vue"
  import Alerter from "@/components/Alerter.vue"
  import Helpers from "@/utils/helpers.js"

  const jsonPostRequest = Helpers.jsonPostRequest
  const jsonBodyRequest = Helpers.jsonBodyRequest
  const apiUrl = Helpers.apiUrl

  export default {
    components: {
      "text-input-form": TextInput,
      "alerter": Alerter,
      "password-input": PasswordInput,
    },

    data(){
      return {
        tokenAlreadySend: false,
        alerterActive: false,
        alerterText: "",

        mail: "",
        token: "",
        password: { text: "", error: false, placeholder: "" },
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

      tokenKeydownListener(e){
        if( !this.tokenAlreadySend ){ e.preventDefault() }
      },

      passwordInputListener(e){
        this.password.text = e.target.value
        this.password.error = false
        this.password.placeholder = ""
      },

      checkPassword(){
        let pass = this.password
        pass.error = (pass.text.length <= 5) || (pass.text.length >= 20)

        if ( pass.error ){ pass.text = "" }

        if( pass.text.length <= 5 ){ pass.placeholder = 'Too short!' }

        if( pass.text.length >= 20 ){ pass.placeholder = 'Too long!' }
      },

      async submitButtonClickListener(e){
        this.checkPassword()

        if ( this.password.error ){ return }

        if ( this.tokenAlreadySend ){
          await this.changePassword()
        } else {
          await this.sendToken()
        }
      },

      async sendToken(){
        let res = await jsonPostRequest(`${ apiUrl }/password-recovery`, { mail: this.mail })
        this.customAlert(await res.text())

        this.tokenAlreadySend = Math.floor(res.status / 100) == 2
      },

      async changePassword(){
        let res = await jsonBodyRequest(`${ apiUrl }/password-recovery`, "PATCH", {
          mail: this.mail,
          password: this.password.text,
          token: this.token
        })

        this.customAlert(await res.text())

        if ( Math.floor(res.status / 100) != 2 ){ return }

        setTimeout(()=>{ this.$router.push("/signin") }, 4000)
      }
    },
  }
</script>
