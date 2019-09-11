<template lang="pug">
  v-container.fluid.fill-height
    v-card.fill-width.fill-height
      v-card-title
      v-card-text
</template>

<script>
export default {
  props: {
    batchId: {
      type: String,
      default: null
    }
  },
  mounted () {
    // TODO: load gallery detail data.
  }
}
</script>

<style scoped>
</style>
