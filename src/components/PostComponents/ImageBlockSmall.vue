<template>
  <div class="mobile_images_inner" v-if="images.length > 0">
    <div class="passive_image mobile_image_inner" v-if="images.length > 1">
      <img :src="passiveImageSrc" class="mobile_image">
    </div>

    <div class="image_scroll_buttons_inner" :class="Array.from(firstImageClasses)">
      <div class="image_scroll_part" @click="scrollImage('left')"></div>

      <div class="mobile_post_like_part" @click="doubleClickLikePost">
        <div class="mobile_post_like" :class="Array.from(likeClasses)"></div>
      </div>

      <div class="mobile_image_inner scroll_inner_image">
        <img :src="firstImageSrc" class="mobile_image">
      </div>

      <div class="image_scroll_part" @click="scrollImage('right')"></div>
    </div>

    <div class="mobile_image_inner" :class="Array.from(secondImageClasses)" v-if="images.length > 1">
      <img :src="secondImageSrc" class="mobile_image">
    </div>

    <div class="image_count_bubles_inner" v-if="images.length > 1" :id=" 'bubles#' + postId">
      <div v-for="i in images.length"
        class="image_count_buble"
        :class="{ 'image_count_buble_active': index+1 == i }"
        @click="changeIndex(i-1)"
      ></div>
    </div>
  </div>
</template>

<script>
  let timeout = (func, time)=>{
    return new Promise( (res, rej)=>{
      setTimeout(() => {
        func(); res();
      }, time);
    })
  }

  export default {
    props: {
      "postId": { type: Number, default: 0 },
      "images": { type: Array, default: [] },
      "staticSrc": { type: String, default: "" },
    },

    emits: [ 'like' ],

    data(){
      return {
        index: 0,

        imagesParsed: null,
        imagesHeights: [],
        scrolling: false,

        firstImageSrc: this.imageSrc(0),
        passiveImageSrc: this.imageSrc(0),
        secondImageSrc: this.imageSrc(this.images.length - 1),

        firstImageClasses: new Set(["transition_on"]),
        secondImageClasses: new Set(["translate_right"]),
        likeClasses: new Set(),

        centralImagePartClicks: 0,
        bubleInnerScroll: 0,
      }
    },

    methods: {
      changeIndex(i){
        this.index = i
        this.firstImageSrc = this.imageSrc(i)
      },

      scrollBubleInner(indexSwapStep){
        if ( this.images.length <= 10 ){ return }

        let bubleInner = document.getElementById(`bubles#${ this.postId }`)

        this.bubleInnerScroll += indexSwapStep > 0 ? 13 : -13

        bubleInner.scroll(this.bubleInnerScroll, 0)
      },

      doubleClickLikePost(){
        this.centralImagePartClicks++

        if ( this.centralImagePartClicks != 2 ){ return }

        this.$emit('like')

        this.likeClasses.add("mobile_like_animation")

        timeout(()=>{
          this.centralImagePartClicks = 0
          this.likeClasses.delete("mobile_like_animation")
        }, 1600)
      },

      imageSrc(index){
        if ( index > this.images.length - 1 || index < 0 ){ return null }

        return this.staticSrc + '/post_images/' + this.images[index].filename
      },

      async scrollImage(direction){
        let dirRight = direction == 'right'
        let indexSwapStep = dirRight ? 1 : -1

        if ( dirRight ){
          if ( this.index == this.images.length - 1 || this.scrolling || this.images.length == 0 ){
            return
          }
        } else {
          if ( this.index == 0 || this.scrolling || this.images.length == 0 ) {
            return
          }
        }

        this.scrolling = true
        this.firstImageClasses = new Set([]),
        this.secondImageClasses = new Set([ dirRight ? "translate_right" : "translate_left" ])
        this.secondImageSrc = this.imageSrc(this.index + indexSwapStep)

        let first = this.firstImageClasses
        let second = this.secondImageClasses

        await timeout(()=>{
          first.add("transition_on")
          second.add("transition_on")
        }, 100)

        this.index += indexSwapStep
        this.scrollBubleInner(indexSwapStep)

        if ( dirRight ){
          first.add("translate_left")
          second.delete("translate_right")
        } else {
          first.add("translate_right")
          second.delete("translate_left")
        }

        await timeout(()=>{
          this.firstImageSrc = this.imageSrc(this.index)
          first.delete("transition_on")
          second.delete("transition_on")
        }, 500)

        if ( dirRight ){
          first.delete("translate_left")
          second.add("translate_right")
        } else {
          first.delete("translate_right")
          second.add("translate_left")
        }

        this.secondImageSrc = this.imageSrc(this.index + indexSwapStep)

        this.scrolling = false
      },
    },


    created(){
      this.imagesHeights.max = function(){
        let ans = null

        for (let img of this){
          ans = !ans || img.height > ans.height ? img : ans
        }

        return ans
      }

      this.imagesParsed = this.images.map( (s, i)=>{
        let ans = new Image()
        ans.src = this.imageSrc(i)

        ans.onload = ()=>{
          this.imagesHeights.push({ height: ans.height/ans.width, src: ans.src })

          let maxHeightImage = this.imagesHeights.max()

          if ( this.passiveImageSrc != maxHeightImage.src ){
            this.passiveImageSrc = maxHeightImage.src
          }
        }

        return ans
      })
    },
  }
</script>
