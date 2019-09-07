<template lang="pug">
  v-simple-table(
    class="ma-0"
  )
    thead
      tr
        th(class="blue-grey lighten-4 text-center") Date
        th(class="blue-grey lighten-4 text-center") Topic
        th(class="blue-grey lighten-4 text-center") File
        th(class="blue-grey lighten-4 text-center") Speaker
    tbody
      tr(
        v-for="item in items"
        :key="item.t"
      )
        td(class="text-center") {{ item.d }}
        td(class="text-center") {{ item.t }}
        td(class="text-center")
          v-icon(:href="item.f") mdi-file-download-outline
        td(class="text-center") {{ item.s }}
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
