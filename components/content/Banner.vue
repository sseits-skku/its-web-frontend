<template lang="pug">
  v-img(
    :src="img"
    class="fill-width"
    min-height="150px"
    max-height="240px"
  )
    v-card-title(
      class="align-center justify-center fill-width fill-height"
    ) {{ title }}
    v-card-text(
      class="align-center justify-center fill-width fill-height"
    ) {{ text }}
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: '/img/main.png'
    },
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
</style>
