<template lang="pug">
  v-container.fluid
    v-row
      v-col(
        v-for="(item, i) in items"
        :key="i"
        :cols="getCols"
      )
        GalleryItem(
          :batchId="item.id"
          :title="item.title"
          :date="item.d"
          :repImg="item.repImg"
        )
</template>

<script>
import GalleryItem from '@/components/gallery/GalleryItem'
export default {
  components: {
    GalleryItem
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    getCols () {
      return this.$vuetify.breakpoint.name === 'xs'
        ? 6 : this.$vuetify.breakpoint.name === 'sm'
          ? 4 : this.$vuetify.breakpoint.name === 'md'
            ? 3 : 2
    }
  }
}
</script>

<style scoped>
</style>
