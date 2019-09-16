<template lang="pug">
  v-snackbar(
    v-model="show"
    :timeout="5000"
    :top="true"
    :success="type === 'success'"
    :info="type === 'info'"
    :warning="type === 'warning'"
    :error="type === 'error'"
  )
    | {{ snack }}
    v-spacer
    v-btn(text @click.native="show = false") 닫기
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
      get () { return this.$store.state.snackbar.type },
      set (value) { this.$store.commit('snackbar/SET_TYPE', value) }
    },
    show: {
      get () { return this.$store.state.snackbar.show },
      set (value) { this.$store.commit('snackbar/SET_SHOW', value) }
    }
  }
}
</script>
