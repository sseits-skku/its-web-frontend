<template lang="pug">
  v-simple-table.ma-0
    thead
      tr
        th.blue-grey.lighten-4.text-center Date
        th.blue-grey.lighten-4.text-center Topic
        th.blue-grey.lighten-4.text-center File
        th.blue-grey.lighten-4.text-center Speaker
    tbody
      tr(v-for="(item, i) in items" :key="i")
        td.text-center {{ item.d }}
        td.text-center {{ item.t }}
        td.text-center
          v-icon(v-if="item.f" :href="item.f") mdi-file-download-outline
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
        { d: '', t: '교육자료 목록을 가져오는데 실패하였습니다.', f: '', s: '' },
        { d: '', t: '새로고침을 하여 다시 가져오시기 바랍니다.', f: '', s: '' },
        { d: '', t: '새로고침을 하여도 실패할 경우, 관리자에게 연락 바랍니다.', f: '', s: '' }
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
