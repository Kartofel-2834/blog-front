<template>
  <div
    class="post_creation_field column"
    :class="{ 'post_creation_field_hided': hided }"
  >
    <div class="new_post_top_nav space_between align">
      <div class="row align" style="width: -webkit-fill-available">
        <div class="post_button close_button" @click="closeField"></div>
        <div class="post_field_title">New post:</div>
      </div>

      <div class="post_button check_button" @click="createPost"></div>
    </div>


    <textarea
      class="new_post_text_input"
      @input="textareaInput"
      placeholder="Write here everything you want"
    ></textarea>

    <div class="column">
      <div
        class="cliped_file_name grid_layout_element"
        :class="{ 'hide_opacity': !activeFileIcon.hover }"
      >
        {{ activeFileIcon.filename }}
      </div>

      <div class="clipped_files_inner row">
        <label style="height: -webkit-fill-available">
          <div class="align clip_button_inner">
            <div class="post_button clip_button"></div>
          </div>

          <input type="file" class="hide" accept=".png, .jpg, .jpeg" value="" @input="checkInputFile" multiple>
        </label>

        <div class="file_square_inner">
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

          return filesSize/1024/1024 > 64 ? false : true
        })

        this.files = this.files.map( (f)=>{
          let file = f

          file.id = randomId(16)

          return file
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

        if ( Math.floor(status / 100) == 2 ){
          this.hideFieldMethod()
        }
        /*
        let newPost = { owner_id: this.userId }
        const text = this.postText

        if ( typeof text == "string" && text.length > 0  && text.length < 5000 ){
          newPost.text = text
        }

        if ( Object.keys(newPost).length < 2 ){ return }

        let status = await this.$emit('createPost', newPost)

        if ( Math.floor(status / 100) == 2 ){
          this.hideFieldMethod()
        }
        */
      }
    },
  }
</script>
