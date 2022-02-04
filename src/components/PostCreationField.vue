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

        let status = await this.$emit('createPost', newPost)

        this.postText = ""
        this.files = []

        if ( Math.floor(status / 100) == 2 ){ this.hideFieldMethod() }
      }
    },
  }
</script>

<style>
  .post_creation_field{
    display: grid;
    grid-template-rows: 15% 65% 5% 15%;
    grid-template-columns: 1fr;

    position: fixed;
    top:0;
    z-index: 100;
    width: 100%;
    height: 100vh;
    background-color: white;
    font-size: 1rem;

    transition: 0.25s linear;
  }

  .post_creation_field_hided{
    transform: translate(0, -110vh);
  }

  .post_creation_field_top{
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 1fr;
    padding: 0 1.5rem;
    overflow: hidden;

    background-color: #58bac6;
    font-size: inherit;
  }

  .post_creation_field_top_el{
    text-align: center;
    color: white;
    margin-top: auto;
    margin-bottom: auto;
    max-height: 15vh;
    font-size: 1.3em;
  }

  .close_creation_field_button, .create_post_button, .clip_button{
    grid-column: 1/2;
    grid-row: 1/2;
    margin: auto;

    cursor: pointer;
    width: 1.3rem;
    height: 1.3rem;
  }

  .post_creation_field_textarea_inner{
    padding: 2em;
    font-size: inherit
  }

  .new_post_text_field{
    width: 100%;
    height: 100%;

    font-size: 1em;

    resize: none;
    background-color: white;
    border: none;
    outline: none;

    overflow-x: hidden;
    overflow-y: scroll;
  }

  .post_creation_field_cliped_files_inner{
    display: grid;
    grid-template-columns: fit-content(10%) auto;
    grid-template-rows: 1fr;
  }

  .hover_file_name{
    margin: auto;
    font-size: 0.8em;
    text-align: center;
    cursor: default;
    transition: 0.15s linear;
  }

  .clip_button_inner{
    background-color: #58bac6;
  }

  .clip_button{
    padding: 1.3rem;
    width: 1.7rem;
    height: 1.7rem;
  }

  .cliped_files_inner{
    display: flex;
    align-items: center;
    background-color: #ebebeb;
  }

  .no_scale{
    transform: scale(0);
  }

  .cliped_file{
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;

    width: 10vh;
    height: 10vh;
    background-color: #1c1c1c;
    margin-left: 1rem;
    cursor: pointer;
    transition: 0.15s linear;
  }

  .cliped_file:last-child{ margin-right: 1rem }

  .cliped_file::before, .cliped_image{
    grid-row: 1/2;
    grid-column: 1/2;
    transition: 0.15s linear;
  }

  .cliped_file::before{
    content: '';
    background: no-repeat center/45%;
    background-image: url("~@/assets/icons/close.svg");
    transform: scale(0);
  }

  .cliped_file:hover::before{
    transform: scale(1);
  }

  .cliped_image{
    background: no-repeat center/60%;
    background-image: url("~@/assets/icons/image_icon.svg");

    width: 100%;
    height: 100%;
  }


  @media all and (min-width: 2000px){
    .post_creation_field{ font-size: 2.5rem }

    .post_creation_field_top{
      padding: 0 3.5rem;
    }

    .close_creation_field_button, .create_post_button, .clip_button {
      width: 3rem;
      height: 3rem;
    }

    .cliped_file{
      margin-left: 1.5rem;
    }

    .layout_button::before{
      width: 4rem;
      height: 4rem;
    }

    .cliped_file:last-child{ margin-right: 1.5rem }
  }

  @media all and (min-width: 1600px){
    .post_creation_field{ font-size: 2rem }

    .post_creation_field_top{ padding: 0 3.5rem }

    .close_creation_field_button, .create_post_button, .clip_button {
      width: 2.5rem;
      height: 2.5rem;
    }

    .cliped_file{
      margin-left: 1.5rem;
    }

    .layout_button::before{
      width: 4rem;
      height: 4rem;
    }

    .cliped_file:last-child{ margin-right: 1.5rem }
  }

  @media all and (min-width: 1400px){
    .post_creation_field{ font-size: 1.5rem }

    .post_creation_field_top{ padding: 0 3rem }

    .close_creation_field_button, .create_post_button, .clip_button {
      width: 2rem;
      height: 2rem;
    }

    .layout_button::before{
      width: 3rem;
      height: 3rem;
    }

    .cliped_file{
      margin-left: 1.5rem;
    }
  }

  @media all and (max-width: 900px){
    .post_creation_field{
      grid-template-rows: 10% 75% 5% 10%;
      font-size: 1rem
    }

    .post_creation_field_top{ padding: 0 1rem }

    .close_creation_field_button, .create_post_button {
      width: 1rem;
      height: 1rem;
    }

    .cliped_file{
      width: 7vh;
      height: 7vh;
      margin-left: 0.5rem;
    }

    .clip_button{
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  @media all and (max-height:1200px) and (min-height: 800px){
    .post_creation_field{
      font-size: 1.5rem;
    }

    .close_creation_field_button, .create_post_button {
      width: 1.5rem;
      height: 1.5rem;
    }

    .clip_button{
      width: 2rem;
      height: 2rem;
    }
  }
</style>
