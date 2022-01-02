<template>
  <div class="user_info_text_input_inner align">
    <div class="input_title column align" :class="{ 'input_title_active': focused }">{{ title }}:</div>
    <input
      type="text"
      class="user_info_text_input"
      :class="css_classes"
      @blur="blurCheck"
      @focus="focusedCheck"
      @input="input_listener"
    >
  </div>
</template>

<script>
  export default {
    props: {
      "title": { type: String, default: "Title" },
      "css_classes": { type: Array, default: [] },
      "blur_listener": { type: Function, default: ()=>{} },
      "focus_listener": { type: Function, default: ()=>{} },
      "input_listener": { type: Function, default: ()=>{} },
    },

    data(){
      return { focused: false }
    },

    methods: {
      focusedCheck(e){
        this.focused = true
        this.focus_listener(e)
      },

      blurCheck(e){
        this.focused = false
        this.blur_listener(e)
      },
    },
  }
</script>
