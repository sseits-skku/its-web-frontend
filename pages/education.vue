<template lang="pug">
  v-container.fluid
    v-row
      v-col(cols="12")
        Banner
    v-row
      v-col(cols="12")
        v-toolbar.elevation-1(dense floating)
          v-tabs
            v-tab(@click.native="cat='help'") help
            v-tab(@click.native="cat='self'") self
          v-text-field(
            hide-details
            prepend-icon="mdi-magnify"
            single-line
          )
    v-row
      v-col(cols="12")
        Education(:category="cat")
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
