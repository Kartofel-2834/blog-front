<template>
  <div class="psevdo_body align center">
    <div class="container column align">
      <h1 class="title column align">Registration</h1>

      <div class="inputs_inner column">
        <text-input-form title="Mail"></text-input-form>

        <text-input-form title="Username"></text-input-form>

        <div class="row password_input_inner">
          <text-input-form title="Password" :type="passwordShowed ? 'text' : 'password'"></text-input-form>
          <div
            class="change_password_input_type_button"
            :class="{ 'change_password_input_type_button_active': passwordShowed }"
            @click="changePasswordInputType"
          ></div>
        </div>


        <text-input-form title="Tagname"></text-input-form>
      </div>

      <div class="button submit_button">Submit</div>
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
      return { passwordShowed: false }
    },

    methods: {
      changePasswordInputType(){ this.passwordShowed = !this.passwordShowed }
    },
  }
</script>

<style src="@/assets/css/registration.css"></style>
