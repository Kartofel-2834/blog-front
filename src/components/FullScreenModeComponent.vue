<template>
  <div
    v-if="images.length && images.length > 0"
    class="blackhole center align column"
    :class="fullscreenModeChangeListener"
    @click="blackholeClickListener"
  >
    <div class="fullscreen_image_inner align">
      <img
        v-if="images.length > 1"
        src="@/assets/icons/arrow.svg"
        class="galery_arrow left_arrow"
        name="blackholeContent"
        @click="prevImage"
      >

      <img :src="'/img/' + images[index].filename" class="fullscreen_image" name="blackholeContent">

      <img
        v-if="images.length > 1"
        src="@/assets/icons/arrow.svg"
        class="galery_arrow right_arrow"
        name="blackholeContent"
        @click="nextImage"
      >
    </div>


    <div class="image_counter">{{ index+1 }} of {{ images.length }}</div>

    <galery-images-row
      :images="images"
      :image_change_method="image_change_method"
      :index="index"
    ></galery-images-row>
  </div>

</template>

<script>
  import GaleryRow from "@/components/GaleryRow.vue"

  export default {
      props: {
        "method_for_close_fullscreen": { type: Function, default: ()=>{} },
        "fullscreen_mode": { type: Boolean, default: false },
        "images": { type: Array, default: [] },
        "index": { type: Number, default: 0 },
        "image_change_method": { type: Function, default: ()=>{} },
      },

      data(){
        return {
          blackholeClasses: new Set(),
        }
      },

      components: {
        "galery-images-row": GaleryRow,
      },

      methods:{
        nextImage(){
          if ( this.index + 1 == this.images.length ){
            this.image_change_method(0)
          } else {
            this.image_change_method(this.index + 1)
          }
        },

        prevImage(){
          if ( this.index - 1 < 0 ){
            this.image_change_method(this.images.length - 1)
          } else {
            this.image_change_method(this.index - 1)
          }
        },

        hideBlackhole(){
          this.blackholeClasses.add("hide_opacity")
          setTimeout(()=>{ this.blackholeClasses.add("hide") }, 300)
        },

        showBlackhole(){
          this.blackholeClasses.delete("hide")
          setTimeout(()=>{ this.blackholeClasses.delete("hide_opacity") }, 300)
        },

        blackholeClickListener(e){
          let clickPath = e.path.map( el => el.name )

          if ( clickPath.indexOf('blackholeContent') != -1 ){ return }

          this.method_for_close_fullscreen()
        }
      },

      computed: {
        fullscreenModeChangeListener(){
          if ( this.fullscreen_mode ){
            this.showBlackhole()
          } else {
            this.hideBlackhole()
          }

          return Array.from(this.blackholeClasses)
        }
      }
  }
</script>
