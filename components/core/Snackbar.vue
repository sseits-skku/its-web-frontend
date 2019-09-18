<template lang="pug">
  v-snackbar.text-center(
    v-model="show"
    :timeout="50000"
    :top="true"
    :color="type"
  )
    v-spacer
    v-card-text.pa-0.subtitle-1.Sans {{ snack }}
    v-spacer
    v-btn.ma-0.Sans(text @click.native="show = false") 닫기
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    snack: {
      get () { return this.$store.state.snackbar.snack },
      set (value) { this.$store.commit('snackbar/SET_SNACK', value) }
    },
    type: {
      get () {
        console.log(this.$store.state.snackbar.type)
        return this.$store.state.snackbar.type
      },
      set (value) { this.$store.commit('snackbar/SET_TYPE', value) }
    },
    show: {
      get () { return this.$store.state.snackbar.show },
      set (value) { this.$store.commit('snackbar/SET_SHOW', value) }
    }
  }
}
</script>
