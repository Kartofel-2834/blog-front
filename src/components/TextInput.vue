<template>
  <div class="user_info_text_input_inner align">
    <div
      class="input_title column align"
      :class="titleClassesCheck"
    >
      {{ title[0].toUpperCase() + title.slice(1, title.length) }}:
    </div>

    <input
      :type="type"
      class="user_info_text_input"
      :class="inputClasses"
      @blur="blurCheck"
      @focus="focusedCheck"
      @input="trueInputListener"
      @keydown="keydownListener"
      :placeholder="placeholder"
      :value="value"
    >
  </div>
</template>

<script>
  export default {
    props: {
      "type": { type: String, default: "text" },
      "title": { type: String, default: "Title" },
      "value": { type: String, default: "" },
      "placeholder": { type: String, default: "" },
      "inputClasses": { type: Array, default: [] },
      "titleClasses": { type: Array, default: [] },
      "blurListener": { type: Function, default: ()=>{} },
      "focusListener": { type: Function, default: ()=>{} },
      "inputListener": { type: Function, default: ()=>{} },
      "keydownListener": { type: Function, default: ()=>{} },
    },

    data(){
      return { focused: false }
    },

    methods: {
      focusedCheck(e){
        this.focused = true
        this.focusListener(e)
      },

      blurCheck(e){
        this.focused = false
        this.blurListener(e)
      },

      trueInputListener(e){
        this.inputListener(e, this.title)
      },
    },

    computed: {
      titleClassesCheck(){
        let ans = new Set(this.titleClasses)

        if ( this.focused ){
          ans.add('input_title_active')
        } else {
          ans.delete('input_title_active')
        }

        return Array.from(ans)
      }
    }
  }
</script>
