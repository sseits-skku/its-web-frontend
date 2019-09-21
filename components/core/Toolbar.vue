<template lang="pug">
  v-app-bar(
    v-if="dPerm !== true"
    @click.native="dOpen = true"
    app
    dense
  )
    v-spacer
    v-app-bar-nav-icon
    v-spacer
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    dOpen: {
      get () { return this.$store.state.drawerOpen },
      set (value) { this.$store.commit('setDrawerOpen', value) }
    },
    dPerm: {
      get () { return this.$store.state.drawerPerm },
      set (value) { this.$store.commit('setDrawerPerm', value) }
    }
  }
}
</script>
