<template>
  <div class="psevdo_body align center">
    <div class="reg_container column align">
      <h1 class="title column align">Registration</h1>

      <div class="inputs_inner column">
        <text-input-form title="Mail" :input_listener="writeMailInData"></text-input-form>

        <text-input-form title="Name" :input_listener="writeNameInData"></text-input-form>

        <text-input-form title="Surname" :input_listener="writeSurnameInData"></text-input-form>

        <div class="row password_input_inner">
          <text-input-form
            title="Password"
            :type="passwordShowed ? 'text' : 'password'"
            :input_listener="writePasswordInData"
          ></text-input-form>

          <div
            class="change_password_input_type_button"
            :class="{ 'change_password_input_type_button_active': passwordShowed }"
            @click="changePasswordInputType"
          ></div>
        </div>


        <text-input-form title="Tagname" :input_listener="writeTagnameInData"></text-input-form>
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
        mail: '',
        name: '',
        surname: '',
        password: '',
        tagname: '',
      }
    },

    methods: {
      changePasswordInputType(){ this.passwordShowed = !this.passwordShowed },

      writeMailInData(e){ this.mail = e.target.value },
      writeNameInData(e){ this.name = e.target.value },
      writeSurnameInData(e){ this.surname = e.target.value },
      writePasswordInData(e){ this.password = e.target.value },
      writeTagnameInData(e){ this.tagname = e.target.value },

      submitButtonClickListener(){
        const mailChecker = /[a-z]@[a-z]/
        const nameChecker = /^[^\%/\\&\?\,\'\;:!-+!@#\$\^*)(]{1,25}$/

        if ( !mailChecker.test(this.mail) ){
          //alert("майл не подходит")
        }

        if ( !nameChecker.test(this.name) ){
          //alert("имя не подходит")
        }
      }
    },
  }
</script>

<style src="@/assets/css/registration.css"></style>
