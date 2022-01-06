<template>
  <div class="alerter" @click="alerter_hide_method" :class="hideControl">{{ text }}</div>
</template>

<script>
 export default {
   props: {
     "css_classes": { type: Array, default: [] },
     "text": { type: String, default: "" },
     "active": { type: Boolean, default: false },
     "alert_method": { type: Function, default: ()=>{} },
     "alerter_hide_method": { type: Function, default: ()=>{} },
   },

   data(){
     return { cssClasses: new Set() }
   },

   methods: {
     hide(){
       this.cssClasses.add("hide_opacity")
       setTimeout(()=>{ this.cssClasses.add("hide") }, 300)
     },

     show(){
       this.cssClasses.delete("hide")
       setTimeout(()=>{ this.cssClasses.delete("hide_opacity") }, 300)
       setTimeout(()=>{ this.alerter_hide_method() }, 3500)
     },
   },

   computed: {
     hideControl(){
       if ( this.active ){
         this.show()
       } else {
         this.hide()
       }

       return Array.from(this.cssClasses).concat(this.css_classes)
     },
   }
 }
</script>
