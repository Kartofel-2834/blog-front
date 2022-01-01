<template>
  <div class="hide">{{ setNavPages }}</div>
  <div class="hide">{{ pageIndexControl }}</div>

  <div class="align">
    <img
      v-if="pages.length > 1"
      src="@/assets/icons/arrow.svg"
      class="galery_arrow left_arrow little_arrow"
      name="blackholeContent"
      @click="prevPage"
    >

    <div
      class="galery_nav row"
      v-if="images.length > 1"
      v-for="pageInd in pages.length"
      :class="{ 'hide': (pageInd-1) != pageIndex }"
    >
      <div
        v-for="imgInd in pages[pageInd-1].length"
        class="short_galery_nav_button_inner center align"
        :class="{ 'short_galery_nav_button_inner_active': (pageIndex*rowleng)+(imgInd-1) == index }"
      >
        <img
          :src="'/img/' + pages[pageInd-1][imgInd-1].filename"
          class="short_galery_nav_button"
          name="blackholeContent"
          @click="image_change_method((pageIndex*rowleng)+(imgInd-1))"
        >
      </div>
    </div>

    <img
      v-if="pages.length > 1"
      src="@/assets/icons/arrow.svg"
      class="galery_arrow right_arrow little_arrow"
      name="blackholeContent"
      @click="nextPage"
    >
  </div>
<!--  :class="{ 'short_galery_nav_button_inner_active': index == i-1 }"-->
</template>

<script>
  export default {
    props: {
      "images": { type: Array, default: [] },
      "image_change_method": { type: Function, default: ()=>{} },
      "index": { type: Number, default: 0 },
      "rowleng": { type: Number, default: 5 },
    },

    data(){
      return {
        pages: [],
        pageIndex: 0,
      }
    },

    methods: {
      nextPage(){
        if ( this.pageIndex+1 < this.pages.length ){
          this.pageIndex++
        } else {
          this.pageIndex = 0
        }
      },

      prevPage(){
        if ( this.pageIndex-1 > -1 ){
          this.pageIndex--
        } else {
          this.pageIndex = this.pages.length-1
        }
      },
    },

    computed: {
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

      pageIndexControl(){
        this.pageIndex = Math.floor(this.index/this.rowleng)
      },
    },
  }
</script>
