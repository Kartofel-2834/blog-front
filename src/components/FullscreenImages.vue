<template>
  <div class="hide" :id="checkImageIndex"></div>

  <div class="image_fullscreen_window" :class="cssClasses" @click="clickListener">
    <img v-if="images.length == 1" :src="images[0]" class="single_image" id="mainImage">

    <div class="fullscreen_image_main_part" v-if="images.length > 1">
      <div class="arrow_button" id="arrow" @click="prevImage"></div>

      <div class="fullscreen_main_image_inner">
        <img :src="images[index]" class="fullscreen_main_image" id="mainImage">
      </div>

      <div class="arrow_button" id="arrow" @click="nextImage"></div>
    </div>


    <div class="fullscreen_images_roll" id="fullscreenImageRow" v-if="images.length > 1">
      <div
        v-for="i in images.length"
        @click="$emit('setIndex', i-1)"

        class="small_nav_image_inner"
        :class="{ 'active_fullscreen_image': i-1 == currentIndex }"
      >
        <img :src="images[i-1]" loading="lazy" class="small_nav_image">
      </div>
    </div>
  </div>
</template>

<style src="@/assets/css/componentsStyles/fullscreen.css"></style>

<script>
  export default {
    props: {
      images: { type: Array, default: [] },
      opened: { type: Boolean, default: false },
      index: { type: Number, default: 0 },
    },

    emits: [ "open", "close", "setIndex" ],

    data(){
      return { currentIndex: 0, classes: new Set() }
    },

    methods:{
      clickListener(e){
        let clickPathIds = e.path.map(e => e.id)
        let checkId = (id)=>{ return clickPathIds.indexOf(id) != -1 }

        if ( checkId("mainImage") || checkId("fullscreenImageRow") || checkId("arrow") ){ return }

        this.$emit('close')
      },

      nextImage(){
        if (this.currentIndex < this.images.length-1){
          this.$emit('setIndex', this.currentIndex+1)
        } else {
          this.$emit('setIndex', 0)
        }
      },

      prevImage(){
        if (this.currentIndex > 0){
          this.$emit('setIndex', this.currentIndex-1)
        } else {
          this.$emit('setIndex', this.images.length-1)
        }
      },
    },

    computed:{
      checkImageIndex(){ this.currentIndex = this.index },

      cssClasses(){
        if (this.opened){
          this.classes.delete("hide")
          setTimeout(()=>{ this.classes.delete("hide_opacity") }, 300)
        } else {
          this.classes.add("hide_opacity")
          setTimeout(()=>{ this.classes.add("hide") }, 300)
        }

        return Array.from(this.classes)
      }
    }
  }
</script>
