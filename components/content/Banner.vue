<template lang="pug">
  v-img.fill-width(
    :src="img"
    min-height="150px"
    max-height="240px"
  )
    v-card-title.my-auto.fill-width.fill-height
      v-row.pa-2.fill-height.align-center
        v-col.text-center
          .pb-3.display-1.Serif.WhiteShadow {{ title }}
          .pt-3.title-1.Sans.WhiteShadow {{ text }}
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
