<template lang="pug">
  v-simple-table.ma-0
    thead
      tr
        th.blue-grey.lighten-4.text-center Date
        th.blue-grey.lighten-4.text-center Topic
        th.blue-grey.lighten-4.text-center File
        th.blue-grey.lighten-4.text-center Speaker
    tbody
      tr(
        v-for="item in items"
        :key="item.t"
      )
        td.text-center {{ item.d }}
        td.text-center {{ item.t }}
        td.text-center
          v-icon(:href="item.f") mdi-file-download-outline
        td.text-center {{ item.s }}
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      items: [
        { d: new Date(), t: 'hello??', f: 'https://localhost:8000/api/help', s: '1' },
        { d: new Date(), t: 'hello??', f: 'https://localhost:8000/api/help', s: '1' },
        { d: new Date(), t: 'hello??', f: 'https://localhost:8000/api/help', s: '1' },
        { d: new Date(), t: 'hello??', f: 'https://localhost:8000/api/help', s: '1' },
        { d: new Date(), t: 'hello??', f: 'https://localhost:8000/api/help', s: '1' },
        { d: new Date(), t: 'hello??', f: 'https://localhost:8000/api/help', s: '1' },
        { d: new Date(), t: 'hello??', f: 'https://localhost:8000/api/help', s: '1' },
        { d: new Date(), t: 'hello??', f: 'https://localhost:8000/api/help', s: '1' },
        { d: new Date(), t: 'hello??', f: 'https://localhost:8000/api/help', s: '1' },
        { d: new Date(), t: 'hello??', f: 'https://localhost:8000/api/help', s: '1' }
      ]
    }
  }/*,
  mounted: {
    // TODO: retrieve data and filter by given props.
  } */
}
</script>

<style scoped>
</style>
