<template>
  <div class="hide">{{ setNavPages }}</div>
  <div class="hide">{{ imageIndexControl }}</div>
  <div class="hide">{{ pageIndexControl }}</div>


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


    <div class="image_counter" v-if="images.length > 1">{{ index+1 }} of {{ images.length }}</div>

    <galery-images-row
      :pages="pages"
      :next_page_method="nextPage"
      :prev_page_method="prevPage"
      :page_index="pageIndex"
      :set_img_index_method="setImageIndex"
      :fullscreen_mode="fullscreen_mode"
      :img_index="imgIndex"
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
        "rowleng": { type: Number, default: 5 },
      },

      data(){
        return {
          blackholeClasses: new Set(),
          pages: [],
          pageIndex: 0,
          imgIndex: 0,
        }
      },

      components: {
        "galery-images-row": GaleryRow,
      },

      methods:{
        setImageIndex(imgIndex, pageIndex){
          if (imgIndex == this.rowleng || imgIndex < 0){ return }
          if (pageIndex == this.pages.length || pageIndex < 0){ return }
          this.imgIndex = imgIndex
          this.pageIndex = pageIndex
        },

        nextImage(){
          if ( this.imgIndex + 1 == this.pages[this.pageIndex].length ){
            this.nextPage()
          } else {
            this.imgIndex++
          }
        },

        nextPage(){
          if ( this.pageIndex+1 == this.pages.length ){
            this.pageIndex = 0
          } else {
            this.pageIndex++
          }

          this.imgIndex = 0
        },

        prevImage(){
          if ( this.imgIndex - 1 < 0 ){
            this.prevPage()
          } else {
            this.imgIndex--
          }
        },

        prevPage(){
          if ( this.pageIndex-1 > -1 ){
            this.pageIndex--
          } else {
            this.pageIndex = this.pages.length-1
          }

          this.imgIndex = this.pages[this.pageIndex].length - 1
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
        },

        setNavPages(){
          let answer = []
          let buff = []

          for ( let img of this.images ){
            if ( buff.length == this.rowleng ){
              answer.push(buff)
              buff = []
            }

            buff.push(img)
          }

          if ( buff.length > 0 ){ answer.push(buff) }

          this.pages = answer
        },

        imageIndexControl(){
          this.image_change_method(this.imgIndex+(this.pageIndex * this.rowleng))
        },

        pageIndexControl(){
          this.pageIndex = Math.floor(this.index / this.rowleng)
          this.imgIndex = this.index % this.rowleng
        }
      },
  }
</script>
