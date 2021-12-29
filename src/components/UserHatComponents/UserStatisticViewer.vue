<template>
  <div class="user_stat_el column align">
    <div class="user_stat_count">{{ count }}</div>
    <div class="user_stat_name">{{ title }}</div>
  </div>
</template>

<script>
  export default {
    props: {
      "title": { type: String, default: "statistic" },
      "count": { type: Number, default: 0 }
    }
  }
</script>
