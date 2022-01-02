<template>
  <div class="psevdo_body align center">
    <div class="container column align">
      <h1 class="title column align">Registration</h1>

      <div class="inputs_inner column">
        <text-input-form title="Mail"></text-input-form>

        <text-input-form title="Username"></text-input-form>

        <text-input-form title="Password"></text-input-form>

        <text-input-form title="Tagname"></text-input-form>
      </div>

      <div class="central_button submit_button">Submit</div>
    </div>
  </div>

</template>

<script>
  import TextInput from "@/components/TextInput.vue"

  export default {
    components: {
      "text-input-form": TextInput,
    }
  }
</script>

<style src="@/assets/css/registration.css"></style>
