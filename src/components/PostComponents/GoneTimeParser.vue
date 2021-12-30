<template>
  <div class="publication_date" :class="css_classes">{{ goneTimeParser() }}</div>
</template>

<script>
  function getDateInAllTimeTypes(time){
    let answer = { seconds: Math.floor(time / 1000) }

    answer.minutes = Math.floor(answer.seconds / 60)
    answer.hours = Math.floor(answer.minutes / 60)
    answer.days = Math.floor(answer.hours / 24)
    answer.months = Math.floor(answer.days / 31)
    answer.years = Math.floor(answer.months / 12)

    return answer
  }

  export default {
    props: {
      "css_classes": { type: Array, default: [] },
      "date": { type: Date, default: new Date() }
    },

    methods:{
      goneTimeParser(){
        let delay = Date.now() - this.date
        let timeTypes = [ 'years', 'months', 'days', 'hours', 'minutes', 'seconds' ]
        let timeParsed = getDateInAllTimeTypes(delay)

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

        return "now"
      }
    },
  }
</script>
