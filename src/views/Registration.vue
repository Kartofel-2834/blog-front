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
          title="Mail"
          :value="mail.text"
          :input_listener="mailInputListener"
          :title_classes="[ mail.error ? 'error_title' : '' ]"
          :placeholder="mail.placeholder"
        ></text-input-form>

        <text-input-form
          title="Name"
          :value="name.text"
          :input_listener="nameInputListener"
          :title_classes="[ name.error ? 'error_title' : '' ]"
          :placeholder="name.placeholder"
        ></text-input-form>

        <text-input-form
          title="Surname"
          :value="surname.text"
          :input_listener="surnameInputListener"
          :title_classes="[ surname.error ? 'error_title' : '' ]"
          :placeholder="surname.placeholder"
        ></text-input-form>

        <text-input-form
          title="Tagname"
          :value="tagname.text"
          :input_listener="tagnameInputListener"
          :title_classes="[ tagname.error ? 'error_title' : '' ]"
          :placeholder="tagname.placeholder"
        ></text-input-form>

        <div class="row password_input_inner">
          <text-input-form
            title="Password"
            :value="password.text"
            :type="passwordShowed ? 'text' : 'password'"
            :input_listener="passwordInputListener"
            :placeholder="password.placeholder"
            :title_classes="[ password.error ? 'error_title' : '' ]"
          ></text-input-form>

          <div
            class="change_password_input_type_button"
            :class="{ 'change_password_input_type_button_active': passwordShowed }"
            @click="changePasswordInputType"
          ></div>
        </div>
      </div>

      <div class="button submit_button" @click="submitButtonClickListener">Submit</div>
    </div>
  </div>

</template>

<script>
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
    },

    data(){
      return {
        passwordShowed: false,
        someErrorExist: false,
        alerterActive: false,
        alerterText: "",

        mail: { text: '', error: false, placeholder: '' },
        name: { text: '', error: false, placeholder: '' },
        surname: { text: '', error: false, placeholder: '' },
        tagname: { text: '', error: false, placeholder: '' },
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
        return this.mail.error || this.password.error || this.tagname.error || this.name.error || this.surname.error
      },

      changePasswordInputType(){ this.passwordShowed = !this.passwordShowed },

      inputListener(e, key){
        this[key].text = e.target.value
        this[key].error = false
        this[key].placeholder = ""
      },

      mailInputListener(e){ this.inputListener(e, 'mail') },
      nameInputListener(e){ this.inputListener(e, 'name') },
      surnameInputListener(e){ this.inputListener(e, 'surname') },
      passwordInputListener(e){ this.inputListener(e, 'password') },
      tagnameInputListener(e){ this.inputListener(e, 'tagname') },

      checkMail(){
        const mailChecker = /[a-z]@[a-z]/

        this.mail.error = !mailChecker.test(this.mail.text)
        if ( this.mail.error ){
          this.mail.placeholder = "Forbidden symbols!"
          this.mail.text = ""
        }
      },

      checkName(nametype){
        const forbiddenSymbols = /^[^\%/\\&\?\,\'\;:!-+!@#\$\^*)(]{2,20}$/
        let text = this[nametype].text

        this[nametype].error = !forbiddenSymbols.test(text) || (text.length == 0) || (text.length >= 20)

        if ( this[nametype].error ){ this[nametype].text = '' }

        if( text.length == 0 ){ this[nametype].placeholder = 'Too short!'; return }

        if( text.length >= 20 ){ this[nametype].placeholder = 'Too long!'; return }

        if ( !forbiddenSymbols.test(text) ){ this[nametype].placeholder = 'Forbidden symbols!'; return }
      },

      checkNames(){
        for (let nametype of ['name', 'surname', 'tagname']){
          this.checkName(nametype)
        }
      },

      passwordCheck(){
        this.password.error = (this.password.text.length <= 5) || (this.password.text.length >= 20)

        if ( this.password.error ){ this.password.text = "" }

        if( this.password.text.length <= 5 ){ this.password.placeholder = 'Too short!' }

        if( this.password.text.length >= 20 ){ this.password.placeholder = 'Too long!' }
      },

      async submitButtonClickListener(){
        this.checkMail()
        this.checkNames()
        this.passwordCheck()

        if( this.checkErrors() ){ return }

        let res = await jsonPostRequest('http://localhost:3000/registration', {
          mail: this.mail.text,
          password: this.password.text,
          name: this.name.text,
          tagname: this.tagname.text,
          surname: this.surname.text,
        })

        switch (res.status) {
          case 406:
            let resText = await res.text()
            this.customAlert( resText ? resText : res.statusText )
          break
        }
      },
    },

    computed: {
      errorWasFinded(){
        this.someErrorExist = this.mail.error || this.password.error || this.tagname.error
        this.someErrorExist = this.someErrorExist || this.name.error || this.surname.error
        return this.someErrorExist
      }
    }
  }
</script>

<style src="@/assets/css/registration.css"></style>
