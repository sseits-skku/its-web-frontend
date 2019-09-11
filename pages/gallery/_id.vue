<template lang="pug">
  GalleryDetail(:batchId="bId")
</template>

<script>
import GalleryDetail from '@/components/gallery/GalleryDetail'
export default {
  validate ({ params }) { return /^\d+$/.test(params.id) },
  components: {
    GalleryDetail
  },
  computed: {
    bId () { return this.$route.params.id }
  }
}
</script>
