<template lang="pug">
  v-img.fill-width(
    :src="img"
    min-height="150px"
    max-height="240px"
  )
    v-card-title.align-center.justify-center.fill-width.fill-height {{ title }}
    v-card-text.align-center.justify-center.fill-width.fill-height {{ text }}
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
