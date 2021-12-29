<template>
  <div class="post column">
    <div class="row">
      <avatar
      :img_src="'/img/' + owner_avatar_filename"
      :frame_classes="['column', 'align', 'short_avatar_inner']"
      ></avatar>

      <div class="column">
        <div class="align post_owner_short_info">
          <div class="post_owner_name">{{ owner_name }} {{ owner_surname }}</div>
          <div class="post_owner_tag">{{ owner_tag }}</div>
        </div>

        <div class="publication_date">{{ goneTimeParser(post.date) }}</div>
      </div>
    </div>

    <div class="post_text">{{ post.text }}</div>
    <img :src="'/img/' + post.images[0].filename" class="post_image">
  </div>
</template>

<script>
  import Avatar from "@/components/Avatar.vue"

  export default {
    props: {
      "post": { type: Object, default: {} },
      "owner_name": { type: String, default: "" },
      "owner_surname": { type: String, default: "" },
      "owner_tag": { type: String, default: "" },
      "owner_avatar_filename": { type: String, default: "" },
    },

    components: { "avatar": Avatar },

    methods:{
      goneTimeParser(time){
        let delay = Date.now() - time
        let timeTypes = [ 'years', 'months', 'days', 'hours', 'minutes', 'seconds' ]
        let timeParsed = { seconds: Math.floor(delay / 1000) }

        timeParsed.minutes = Math.floor(timeParsed.seconds / 60)
        timeParsed.hours = Math.floor(timeParsed.minutes / 60)
        timeParsed.days = Math.floor(timeParsed.hours / 24)
        timeParsed.months = Math.floor(timeParsed.days / 31)
        timeParsed.years = Math.floor(timeParsed.months / 12)


        if ( timeParsed.years > 3){
          return new Date(time).toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
        }

        for ( let timeType of timeTypes ){
          if( timeParsed[ timeType ] > 1 ){
            return `${ timeParsed[ timeType ] } ${ timeType } ago`
          }
          else if( timeParsed[ timeType ] == 1 ){
            return `${ timeParsed[ timeType ] } ${ timeType.slice(0, timeType.length-1) } ago`
          }
        }
      }
    },
  }
</script>
