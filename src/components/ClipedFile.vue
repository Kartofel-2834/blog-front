<template>
  <div
    class="cliped_file"
    :class="{ 'no_scale': !isCreated }"

    @click="remove"
    @mouseover="hoverOn"
    @mouseout="hoverOff"
  >
    <div class="cliped_image" :class="{ 'no_scale': hover }"></div>
  </div>
</template>

<script>
  export default {
    props: {
      filename: { type: String, default: "" },
      fileId: { type: String, default: "" },
    },

    emits: [ 'hoverOn', 'hoverOff', 'deleteFile' ],

    data(){
      return {
        hover: false,
        isCreated: false,
      }
    },

    created(){
      setTimeout(()=>{ this.isCreated = true }, 300)
    },

    methods:{
      hoverOn(){
        this.hover = true
        this.$emit('hoverOn', this.filename)
      },

      hoverOff(){
        this.hover = false
        this.$emit('hoverOff')
      },

      remove(){
        this.$emit('hoverOff')
        this.$emit('deleteFile', this.fileId)
      }
    }
  }
</script>
