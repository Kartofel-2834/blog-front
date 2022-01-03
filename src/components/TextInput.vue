<template>
  <div class="user_info_text_input_inner align">
    <div
      class="input_title column align"
      :class="titleClasses"
    >
      {{ title }}:
    </div>

    <input
      :type="type"
      class="user_info_text_input"
      :class="input_classes"
      @blur="blurCheck"
      @focus="focusedCheck"
      @input="input_listener"
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
      "input_classes": { type: Array, default: [] },
      "title_classes": { type: Array, default: [] },
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

    computed: {
      titleClasses(){
        let ans = new Set(this.title_classes)

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
