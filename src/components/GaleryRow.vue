<template>
  <div class="hide">{{ ownPageIndexControl }}</div>
  <div class="hide">{{ ownPageIndexToZero }}</div>

    <div class="align" v-if="pages.length && pages.length > 0 && pages[0].length > 1">
      <img
        v-if="pages.length > 1"
        src="@/assets/icons/arrow.svg"
        class="galery_arrow left_arrow little_arrow"
        name="blackholeContent"
        @click="prevNavPage"
      >

      <div class="galery_nav row">
        <div
          v-for="ownImgIndex in pages[ownPageIndex].length"
          class="short_galery_nav_button_inner center align"
          style="color:white"
          :class="{
            'short_galery_nav_button_inner_active': (ownImgIndex-1) == imgIndex && ownPageIndex == pageIndex
          }"
          @click="setPageAndImgIndex(ownImgIndex-1, ownPageIndex)"
        >
          <img
            :src="pages[ownPageIndex][ownImgIndex-1]"
            class="short_galery_nav_button"
            name="blackholeContent"
          >
        </div>
      </div>

      <img
        v-if="pages.length > 1"
        src="@/assets/icons/arrow.svg"
        class="galery_arrow right_arrow little_arrow"
        name="blackholeContent"
        @click="nextNavPage"
      >
    </div>

</template>

<script>
  export default {
    props: {
      "pages": { type: Array, default: [] },
      "pageIndex": { type: Number, default: 0 },
      "imgIndex": { type: Number, default: 0 },
      "fullscreenMode": { type: Boolean, default: false },
    },

    emits: [ "setImageIndex" ],

    data(){
      return { ownPageIndex: this.pageIndex }
    },

    methods:{
      setPageAndImgIndex(imgIndex, pageIndex){
        this.$emit("setImageIndex", imgIndex, pageIndex)
      },

      nextNavPage(){
        if ( this.ownPageIndex+1 == this.pages.length ){
          this.ownPageIndex = 0
        } else {
          this.ownPageIndex++
        }
      },

      prevNavPage(){
        if ( this.ownPageIndex-1 > -1 ){
          this.ownPageIndex--
        } else {
          this.ownPageIndex = this.pages.length-1
        }
      },
    },

    computed: {
      ownPageIndexControl(){
        this.ownPageIndex = this.pageIndex
      },

      ownPageIndexToZero(){
        if ( !this.fullscreenMode ){ this.ownPageIndex = 0 }
      },
    }
  }
</script>
