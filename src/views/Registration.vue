<template>
  <div class="psevdo_body align center">
    <div class="reg_container column align">
      <h1 class="title column align" :class="{ 'error_title': errorWasFinded }">Registration</h1>

      <alerter
        :text="alerterText"
        :alert_method="customAlert"
        :alerter_hide_method="hideAlerter"
        :active="alerterActive"
      ></alerter>

      <div class="inputs_inner column">
        <text-input-form
          v-for="key in Object.keys(usersData)"
          :title="key"
          :value="usersData[key].text"
          :input_listener="inputListener"
          :title_classes="[ usersData[key].error ? 'error_title' : '' ]"
          :placeholder="usersData[key].placeholder"
        ></text-input-form>

        <password-input
          :value="password.text"
          :input_listener="passwordInputListener"
          :title_classes="[ password.error ? 'error_title' : '' ]"
          :placeholder="password.placeholder"
        ></password-input>
      </div>

      <div class="button submit_button" @click="submitButtonClickListener">Submit</div>
    </div>
  </div>

</template>

<script>
  import PasswordInput from "@/components/PasswordInput.vue"
  import TextInput from "@/components/TextInput.vue"
  import Alerter from "@/components/Alerter.vue"

  async function jsonPostRequest(url, data){
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{ 'Content-Type': 'application/json;charset=utf-8' },
      })

      return response
    } catch (error) {
      console.log("Error: ", error)
      return null
    }
  }

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

        usersData: {
          mail: { text: '', error: false, placeholder: '' },
          name: { text: '', error: false, placeholder: '' },
          surname: { text: '', error: false, placeholder: '' },
          tagname: { text: '', error: false, placeholder: '' },
        },

        password: { text: '', error: false, placeholder: '' },
      }
    },

    methods: {
      customAlert(text){
        if ( typeof text != "string" ){ return }
        this.alerterText = text
        this.alerterActive = true
      },

      hideAlerter(){ this.alerterActive = false },

      checkErrors(){
        let answer = false

        for (let key of Object.keys(this.usersData)){
          answer = answer || this.usersData[key].error
        }

        return answer
      },

      inputListener(e, key){
        this.usersData[key].text = e.target.value
        this.usersData[key].error = false
        this.usersData[key].placeholder = ""
      },

      passwordInputListener(e){
        this.password.text = e.target.value
        this.password.error = false
        this.password.placeholder = ""
      },

      checkMail(){
        const mailChecker = /[a-z]@[a-z]/
        let mail = this.usersData.mail

        mail.error = !mailChecker.test(mail.text)

        if ( mail.error ){
          mail.placeholder = "Forbidden symbols!"
          mail.text = ""
        }

        this.usersData.mail = mail
      },

      checkName(nametype){
        const forbiddenSymbols = /^[^\%/\\&\?\,\'\;:!-+!@#\$\^*)(]{2,20}$/
        let name = this.usersData[nametype]
        let text = name.text

        name.error = !forbiddenSymbols.test(text) || (text.length == 0) || (text.length >= 20)

        if ( name.error ){ name.text = '' }

        if( text.length == 0 ){ name.placeholder = 'Too short!'; return }

        if( text.length >= 20 ){ name.placeholder = 'Too long!'; return }

        if ( !forbiddenSymbols.test(text) ){ name.placeholder = 'Forbidden symbols!'; return }

        this.usersData[nametype] = name
      },

      checkNames(){
        for (let nametype of ['name', 'surname', 'tagname']){
          this.checkName(nametype)
        }
      },

      passwordCheck(){
        let pass = this.password
        pass.error = (pass.text.length <= 5) || (pass.text.length >= 20)

        if ( pass.error ){ pass.text = "" }

        if( pass.text.length <= 5 ){ pass.placeholder = 'Too short!' }

        if( pass.text.length >= 20 ){ pass.placeholder = 'Too long!' }

        this.password = pass
      },

      async submitButtonClickListener(e){
        this.checkMail()
        this.checkNames()
        this.passwordCheck()

        if( this.checkErrors() ){ return }

        let user = {}
        user.password = this.password.text

        for (let key of Object.keys(this.usersData)){
          user[key] = this.usersData[key].text
        }

        let res = await jsonPostRequest('http://localhost:3000/registration', user)

        if ( res.status != 200 ){
          let resText = await res.text()
          this.customAlert( resText ? resText : res.statusText )
          return
        }

        document.location.href = `/token?tag=${ encodeURIComponent(user.tagname) }`
      },
    },

    computed: {
      errorWasFinded(){ return this.checkErrors() }
    }
  }
</script>

<style src="@/assets/css/registration.css"></style>
