<template>
  <div class="row password_input_inner">
    <text-input-form
      title="Password"
      :value="value"
      :type="passwordShowed ? 'text' : 'password'"
      :placeholder="placeholder"
      :titleClasses="titleClasses"

      @input="inputListener"
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
    },

    data(){
      return { passwordShowed: false }
    },

    emits: [ 'input' ],

    components: {
      "text-input-form": TextInput,
    },

    methods: {
      inputListener(e){ this.$emit('input', e) },
      
      changePasswordInputType(){ this.passwordShowed = !this.passwordShowed },
    },
  }
</script>
