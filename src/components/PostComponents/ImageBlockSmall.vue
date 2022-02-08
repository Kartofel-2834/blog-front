<template>
  <div class="mobile_images_inner">
    <div class="passive_image mobile_image_inner" v-if="images.length > 1">
      <img :src="passiveImageSrc" class="mobile_image">
    </div>

    <div class="image_scroll_buttons_inner" :class="Array.from(firstImageClasses)">
      <div class="image_scroll_part" @click="scrollImage('left')"></div>

      <div class="mobile_image_inner scroll_inner_image">
        <img :src="firstImageSrc" class="mobile_image">
      </div>

      <div class="image_scroll_part" @click="scrollImage('right')"></div>
    </div>

    <div class="mobile_image_inner" :class="Array.from(secondImageClasses)" v-if="images.length > 1">
      <img :src="secondImageSrc" class="mobile_image">
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
      }
    },

    props: {
      "images": { type: Array, default: [] },
      "staticSrc": { type: String, default: "" },
    },

    methods: {
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
        }, 600)

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
