<template lang="pug">
  v-flex
    Banner
    v-toolbar(
      dense
      floating
    )
      v-tabs
        v-tab(@click.native="cat='help'") help
        v-tab(@click.native="cat='self'") self
      v-text-field(
        hide-details
        prepend-icon="mdi-magnify"
        single-line
      )
    Education(
      :category="cat"
    )
</template>

<script>
import Banner from '@/components/content/Banner'
import Education from '@/components/content/Education'
export default {
  components: {
    Banner,
    Education
  },
  data () {
    return {
      cat: 'help'
    }
  }
}
</script>
