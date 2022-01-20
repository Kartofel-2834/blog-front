<template>
  <div class="row password_input_inner">
    <text-input-form
      title="Password"
      :value="value"
      :type="passwordShowed ? 'text' : 'password'"
      :inputListener="inputListener"
      :placeholder="placeholder"
      :titleClasses="titleClasses"
    ></text-input-form>

    <div
      class="change_password_input_type_button"
      :class="{ 'change_password_input_type_button_active': passwordShowed }"
      @click="changePasswordInputType"
    ></div>
  </div>
</template>

<script>
  import TextInput from "@/components/TextInput.vue"

  export default {
    props: {
      "value": { type: String, default: "" },
      "placeholder": { type: String, default: "" },
      "titleClasses": { type: Array, default: [] },
      "inputListener": { type: Function, default: ()=>{} },
    },

    data(){
      return { passwordShowed: false }
    },

    components: {
      "text-input-form": TextInput,
    },

    methods: {
      changePasswordInputType(){ this.passwordShowed = !this.passwordShowed },
    },
  }
</script>
