<template>
  <div
    class="post_creation_field column"
    :class="{ 'post_creation_field_hided': hided }"
  >
    <div class="new_post_top_nav space_between align">
      <div class="row align" style="width: -webkit-fill-available">
        <div class="post_button close_button" @click="hide_field_method"></div>
        <div class="post_field_title">New post:</div>
      </div>

      <div class="post_button check_button" @click="hide_field_method"></div>
    </div>


    <textarea class="new_post_text_input" placeholder="Write here everything you want"></textarea>

    <div class="clipped_files_inner row">
      <div class="post_button clip_button"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      "hided": { type: Boolean, default: true },
      "hide_field_method": { type: Function, default: ()=>{} },
    }
  }
</script>
