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

      <div class="post_button check_button" @click="createPost"></div>
    </div>


    <textarea
      class="new_post_text_input"
      @input="textareaInput"
      placeholder="Write here everything you want"
    ></textarea>

    <div class="clipped_files_inner row">
      <label style="height: -webkit-fill-available">
        <div class="align clip_button_inner">
          <div class="post_button clip_button"></div>
        </div>

        <input type="file" class="hide" value="">
      </label>

      <div class="file_square">File</div>
      <div class="file_square">File</div>
      <div class="file_square">File</div>
      <div class="file_square">File</div>

    </div>
  </div>
</template>

<script>
  export default {
    props: {
      "user_id": { type: Number, default: null },
      "hided": { type: Boolean, default: true },
      "hide_field_method": { type: Function, default: ()=>{} },
      "post_send_method": { type: Function, default: ()=>{} },
      "alert_method": { type: Function, default: ()=>{} },
    },

    data(){
      return { postText: "" }
    },

    methods: {
      textareaInput(e){
        this.postText = e.target.value
      },

      async createPost(){
        if ( !this.user_id ){ return }

        let newPost = { owner_id: this.user_id }
        const text = this.postText

        if ( typeof text == "string" && text.length > 0  && text.length < 5000 ){
          newPost.text = text
        }

        if ( Object.keys(newPost).length < 2 ){ return }

        let status = await this.post_send_method(newPost)

        if ( Math.floor(status / 100) == 2 ){
          this.hide_field_method()
        }
      }
    },
  }
</script>
