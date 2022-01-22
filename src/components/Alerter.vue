<template>
  <div class="alerter" @click="$emit('hideAlerter')" :class="hideControl">{{ text }}</div>
</template>

<script>
 export default {
   props: {
     "cssClasses": { type: Array, default: [] },
     "text": { type: String, default: "" },
     "active": { type: Boolean, default: false },
   },

   emits: [ "hideAlerter" ],

   data(){
     return { cssClassesUnic: new Set() }
   },

   methods: {
     hide(){
       this.cssClassesUnic.add("hide_opacity")
       setTimeout(()=>{ this.cssClassesUnic.add("hide") }, 300)
     },

     show(){
       this.cssClassesUnic.delete("hide")
       setTimeout(()=>{ this.cssClassesUnic.delete("hide_opacity") }, 300)
       setTimeout(()=>{ this.$emit('hideAlerter') }, 3500)
     },
   },

   computed: {
     hideControl(){
       if ( this.active ){
         this.show()
       } else {
         this.hide()
       }

       return Array.from(this.cssClassesUnic).concat(this.cssClasses)
     },
   }
 }
</script>
