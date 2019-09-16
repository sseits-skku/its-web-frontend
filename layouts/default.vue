<template lang="pug">
  v-app
    Login/
    Toolbar/
    Drawer/
    v-content
      nuxt/
    Footer/
    Snackbar/
</template>

<script>
import Snackbar from '@/components/core/Snackbar'
import Toolbar from '@/components/core/Toolbar'
import Drawer from '@/components/core/Drawer'
import Footer from '@/components/core/Footer'
import Login from '@/components/core/Login'

export default {
  components: {
    Snackbar,
    Drawer,
    Footer,
    Login,
    Toolbar
  },
  data () {
    return {
      drawer: false,
      dialog: false,
      isauth: false
    }
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },
  mounted () {
    this.$store.dispatch('auth/checkLogin', this.$router)
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  methods: {
    onResize () {
      if (this.$vuetify.breakpoint.name === 'xs') {
        this.$store.commit('setDrawerPerm', false)
      } else if (this.$vuetify.breakpoint.name === 'sm') {
        this.$store.commit('setDrawerPerm', false)
      } else {
        this.$store.commit('setDrawerPerm', true)
        this.$store.commit('setDrawerOpen', true)
      }
    }
  },
  head () {
    return this.$store.state.auth.auth === null
      ? { title: 'SSE-ITS Website' }
      : { title: 'ITS Member zone' }
  }
}
</script>

<style>
/* 와! Sans */
.Sans, .display-4.Sans, .display-3.Sans, .display-2.Sans, .display-1.Sans,
.headline.Sans, .title.Sans, .subtitle-1.Sans, .subtitle-2.Sans,
.body-1.Sans, .body-2.Sans, .caption.Sans, .overline.Sans {
  font-family: 'Noto Sans KR' !important;
}
.Serif, .display-4.Serif, .display-3.Serif, .display-2.Serif, .display-1.Serif,
.headline.Serif, .title.Serif, .subtitle-1.Serif, .subtitle-2.Serif,
.body-1.Serif, .body-2.Serif, .caption.Serif, .overline.Serif {
  font-family: 'Noto Serif KR' !important;
}
</style>
