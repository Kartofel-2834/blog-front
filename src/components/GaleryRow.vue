<template>
  <div class="hide">{{ ownPageIndexControl }}</div>

    <div class="align">
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
            'short_galery_nav_button_inner_active': (ownImgIndex-1) == img_index && ownPageIndex == page_index
          }"
          @click="set_img_index_method(ownImgIndex-1, ownPageIndex)"
        >
          <img
            :src="'/img/' + pages[ownPageIndex][ownImgIndex-1].filename"
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
      "page_index": { type: Number, default: 0 },
      "img_index": { type: Number, default: 0 },
      "next_page_method": { type: Function, default: ()=>{} },
      "prev_page_method": { type: Function, default: ()=>{} },
      "set_img_index_method": { type: Function, default: ()=>{} },
      "fullscreen_mode": { type: Boolean, default: false },
    },

    data(){
      return { ownPageIndex: this.page_index }
    },

    methods:{
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
        if ( !this.fullscreen_mode ){ this.ownPageIndex = 0 }
      }
    }
  }
</script>
