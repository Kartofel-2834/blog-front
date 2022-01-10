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
      <a class="password_recovery_link column align" href="/password-recovery">Forgot password?</a>
    </div>
  </div>
</template>

<style src="@/assets/css/registration.css"></style>

<script>

</script>
