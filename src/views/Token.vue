<template>
  <div class="center" style="z-index: 1000">
    <alerter
      :cssClasses="[ 'alerter_class' ]"
      :text="alerterText"
      :alertMethod="customAlert"
      :alerterHideMethod="hideAlerter"
      :active="alerterActive"
    ></alerter>
  </div>

  <div class="wrapper column align space_between">
    <div class="token_top_nav column align">
      <div class="token_page_title">Put here token, that we send on your e-mail</div>
      <div class="new_token_button" @click="sendNewToken">send new token on mail</div>
    </div>

    <div class="button send_button" @click="sendToken">Send token</div>
  </div>

  <label class="token_input_inner column">
    <div class="token_nums_inner space_around align">
      <div
        v-for="i in 6"
        class="token_num"
        :class="{ 'num_active': (tokenVal.length+1 == i) }"
      >
        {{ tokenVal[i-1] ? tokenVal[i-1] : '0' }}
      </div>
    </div>

    <input type="number" class="shy_input" @input="inputListener">
  </label>
</template>



<script>
  import Alerter from "@/components/Alerter.vue"
  import Helpers from "@/utils/helpers.js"

  const jsonPostRequest = Helpers.jsonPostRequest
  const apiUrl = Helpers.apiUrl

  export default {
    data(){
      return {
        tokenVal: "",
        alerterText: "",
        alerterActive: false,
      }
    },

    components: { "alerter": Alerter },

    created(){
      window.onkeydown = (e)=>{
        return !/[a-z]/.test(e.key) || e.keyCode == 8 //backspace
      }
    },

    methods: {
      customAlert(text){
        if ( typeof text != "string" ){ return }
        this.alerterText = text
        this.alerterActive = true
      },

      hideAlerter(){ this.alerterActive = false },

      inputListener(e){
        if (e.target.value.length > 6 || /[a-z]/.test(e.target.value)){
          e.target.value = this.tokenVal
          return
        }

        this.tokenVal = e.target.value
      },

      async sendToken(){
        const userTagname = this.$route.params.tag

        if ( typeof userTagname != 'string' || userTagname.length < 2 ){ return }

        let valueWithZeroes = String(this.tokenVal)

        for (let i=0; i<(6-this.tokenVal.length); i++){
          valueWithZeroes += '0'
        }

        let res = await jsonPostRequest(`${ apiUrl }/token`, {
          tag: userTagname,
          token: valueWithZeroes
        })

        if ( Math.floor(res.status / 100) != 2 ){
          let resText = await res.text()
          this.customAlert( resText ? resText : res.statusText )
        } else {
          window.onkeydown = ()=>{}
          this.$router.push("/signin")
        }
      },

      async sendNewToken(){
        let tag = this.$route.params.tag

        if ( !tag ){ return }

        let res = await jsonPostRequest(`${ apiUrl }/newToken`, { tag: tag })

        let resText = await res.text()
        this.customAlert( resText ? resText : res.statusText )
      }
    },
  }
</script>

<style src="@/assets/css/token.css"></style>
