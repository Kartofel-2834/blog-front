<template>
  <div class="post_creation_field" :class="{ 'post_creation_field_hided': hided }">
    <div class="post_creation_field_top">
      <div class="post_creation_field_top_el layout_button close_creation_field_button_inner" @click="closeField">
        <img src="@/assets/icons/close.svg" class="close_creation_field_button">
      </div>

      <div class="post_creation_field_top_el creation_field_title">New post:</div>

      <div class="post_creation_field_top_el layout_button create_post_button_inner" @click="createPost">
        <img src="@/assets/icons/check.svg" class="create_post_button">
      </div>
    </div>

    <div class="post_creation_field_textarea_inner">
      <textarea
        class="new_post_text_field"
        :value="postText"
        @input="textareaInput"
        placeholder="Write here everything you want"
      ></textarea>
    </div>

    <div class="hover_file_name" :class="{ 'hide_opacity': !activeFileIcon.hover }">
      {{ activeFileIcon.filename ? activeFileIcon.filename : "fnenvisnvies" }}
    </div>

    <div class="post_creation_field_cliped_files_inner">
      <label class="layout_button clip_button_inner">
        <img src="@/assets/icons/clip.svg" class="clip_button">
        <input type="file" class="hide" accept=".png, .jpg, .jpeg" @input="checkInputFile" multiple>
      </label>

      <div class="cliped_files_inner">
        <cliped-file
          v-for="file in files"
          :filename="file.name"
          :fileId="file.id"

          @deleteFile="deleteFile"
          @hoverOn="fileIconHoverOn"
          @hoverOff="fileIconHoverOff"
        ></cliped-file>
      </div>
    </div>
  </div>
</template>

<style src="@/assets/css/componentsStyles/postCreationField.css"></style>

<script>
  import ClipedFile from "@/components/ClipedFile.vue"

  function getRandom( limit ){
  	return Math.floor(Math.random() * limit)
  }

  function randomId(len){
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
    let ans = ""

    for (let i=0; i<len; i++){
      ans += alphabet[getRandom(alphabet.length)]
    }

    return ans
  }

  export default {
    props: {
      "userId": { type: Number, default: null },
      "hided": { type: Boolean, default: true },
    },

    emits: [ 'hideField', 'createPost' ],

    components: { "cliped-file": ClipedFile },

    data(){
      return {
        postText: "",
        files: [],
        activeFileIcon: { hover: false, filename: "" },
      }
    },

    methods: {
      closeField(){ this.$emit('hideField') },

      fileIconHoverOn(filename){
        this.activeFileIcon.hover = true
        this.activeFileIcon.filename = filename
      },

      fileIconHoverOff(){ this.activeFileIcon.hover = false },

      textareaInput(e){
        this.postText = e.target.value
      },

      checkInputFile(e){
        if( !e.target.files || !e.target.files[0] ){ return }

        let filesSize = 0

        this.files = this.files.concat(Array.from(e.target.files))

        this.files = this.files.filter( (f)=>{
          filesSize += f.size

          return filesSize/1024/1024 < 64
        })

        this.files = this.files.map( (f)=>{
          f.id = randomId(16)
          return f
        })
      },

      deleteFile(id){
        let index = this.files.map( f => f.id ).indexOf(id)

        this.files.splice(index, 1)
      },

      async createPost(){
        if ( !this.userId ){ return }

        let newPost = new FormData()
        const text = this.postText

        newPost.append("owner_id", this.userId)

        if ( typeof text == "string" && text.length > 0  && text.length < 5000 ){
          newPost.append("text", text)
        }

        if ( this.files.length > 0 ){
          for( let f of this.files ){ newPost.append('clipedFiles', f) }
        }

        let keys = 0
        for ( let key of newPost.keys() ){ keys++ }
        if ( keys < 2 ){ return }

        let status = await this.$emit('createPost', newPost)

        this.postText = ""
        this.files = []

        if ( Math.floor(status / 100) == 2 ){ this.hideFieldMethod() }
      }
    },
  }
</script>
