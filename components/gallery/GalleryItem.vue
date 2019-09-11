<template lang="pug">
  v-card(
    min-width="200px"
    min-height="260px"
    max-width="400px"
    max-height="460px"
    @click.native="goPage(batchId)"
  )
    v-img(:src="repImg")
    v-card-title.align-center.justify-center.pb-0(v-text="title")
    v-card-text.text-center.py-2(v-text="date")
</template>

<script>
export default {
  props: {
    batchId: { type: Number, default: undefined },
    title: { type: String, default: undefined },
    date: { type: String, default: 'Developer' },
    repImg: { type: String, default: undefined }
  },
  data () {
    return {
    }
  },
  methods: {
    goPage (id) {
      this.$router.push(`/gallery/${id}`)
    }
  }
}
</script>

<style scoped>
</style>
