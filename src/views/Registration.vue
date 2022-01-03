<template>
  <div class="psevdo_body align center">
    <div class="reg_container column align">
      <h1 class="title column align" :class="{ 'error_title': mainTitleError }">Registration</h1>

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

        <div class="row password_input_inner">
          <text-input-form
            title="Password"
            :type="passwordShowed ? 'text' : 'password'"
            :input_listener="passwordInputListener"
          ></text-input-form>

          <div
            class="change_password_input_type_button"
            :class="{ 'change_password_input_type_button_active': passwordShowed }"
            @click="changePasswordInputType"
          ></div>
        </div>


        <text-input-form
          title="Tagname"
          :value="tagname.text"
          :input_listener="tagnameInputListener"
          :title_classes="[ tagname.error ? 'error_title' : '' ]"
          :placeholder="tagname.placeholder"
        ></text-input-form>
      </div>

      <div class="button submit_button" @click="submitButtonClickListener">Submit</div>
    </div>
  </div>

</template>

<script>
  import TextInput from "@/components/TextInput.vue"

  export default {
    components: {
      "text-input-form": TextInput,
    },

    data(){
      return {
        passwordShowed: false,
        mainTitleError: false,

        mail: { text: '', error: false, placeholder: '' },
        name: { text: '', error: false, placeholder: '' },
        surname: { text: '', error: false, placeholder: '' },
        password: { text: '', error: false, placeholder: '' },
        tagname: { text: '', error: false, placeholder: '' },
      }
    },

    methods: {
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
        const forbiddenSymbols = /^[^\%/\\&\?\,\'\;:!-+!@#\$\^*)(]{5,20}$/
        let text = this[nametype].text

        this[nametype].error = !forbiddenSymbols.test(text) || (text.length <= 5) || (text.length >= 20)

        if ( this[nametype].error ){ this[nametype].text = '' }

        if( text.length <= 5 ){ this[nametype].placeholder = 'Too short!'; return }

        if( text.length >= 20 ){ this[nametype].placeholder = 'Too long!'; return }

        if ( !forbiddenSymbols.test(text) ){ this[nametype].placeholder = 'Forbidden symbols!'; return }
      },

      checkNames(){
        for (let nametype of ['name', 'surname', 'tagname']){
          this.checkName(nametype)
        }
      },

      submitButtonClickListener(){
        this.checkMail()
        this.checkNames()

        this.mainTitleError = this.mail.error || nameChecker.test(this.name.text)
      }
    },
  }
</script>

<style src="@/assets/css/registration.css"></style>
