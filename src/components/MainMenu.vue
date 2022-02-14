<template>
  <div class="main_menu_button" :class="{ 'close_menu_button': mainMenuOpened }" @click="menuButtonClickListener">
    <div v-for="i in 3" class="menu_button_line" :class="{ 'close_menu_button_line': mainMenuOpened }"></div>
  </div>

  <div class="main_menu_inner" :class="[ mainMenuOpened ? 'main_menu_inner_active' : '', mainMenuInnerHideClass ]">
    <div class="main_menu" :class="{ 'main_menu_active': mainMenuOpened }">
      <div class="avatar_inner main_menu_avatar_inner">
        <!--<img src="@/assets/icons/avatar.svg" class="avatar">-->
      </div>

      <div class="main_menu_user_info_inner">
        <div class="main_menu_user_tagname" @click="userPageLink">@{{ user.tagname }}</div>
        <div class="main_menu_user_name">{{ user.name }} {{ user.surname }}</div>
      </div>

      <div class="main_menu_element" @click="userPageLink">
        <div class="main_menu_element_text">My blog</div>
      </div>

      <div class="main_menu_element">
        <div class="main_menu_element_text">Notifications</div>
      </div>

      <div class="main_menu_element">
        <div class="main_menu_element_text">Search</div>
      </div>

      <div class="main_menu_element" @click="simpleLink('/settings')">
        <div class="main_menu_element_text">Settings</div>
      </div>

      <div class="main_menu_element" @click="$emit('exit')">
        <div class="main_menu_element_text">Exit</div>
      </div>
    </div>

    <div class="main_menu_blackhole" @click="closeMainMenu"></div>
  </div>
</template>

<style src="@/assets/css/componentsStyles/mainMenu.css"></style>

<script>
  export default {
    props: {
      "user": { type: Object, default: {} },
    },

    emits: [ 'exit' ],

    data(){
      return {
        mainMenuOpened: false,
        mainMenuInnerHideClass: "hide",
      }
    },

    methods:{
      openMainMenu(){
        this.mainMenuInnerHideClass = ""

        setTimeout(()=>{ this.mainMenuOpened = true }, 100)
      },

      closeMainMenu(){
        this.mainMenuOpened = false

        setTimeout(()=>{ this.mainMenuInnerHideClass = "hide" }, 300)
      },

      menuButtonClickListener(){
        if ( this.mainMenuOpened ){ this.closeMainMenu(); return }

        this.openMainMenu()
      },

      userPageLink(){ document.location.href = `/${ this.user.tagname }` },

      simpleLink(path){ this.$router.push(`/${ this.user.tagname }${ path }`) }
    },

    created(){
      window.addEventListener("keydown", (e)=>{
        if ( e.keyCode == 27 ){ this.menuButtonClickListener() }
      })
    }
  }
</script>
