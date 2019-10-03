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
        td.text-center {{ item.created_date | dateFormatter }}
        td.text-center {{ item.caption }}
        td.text-center
          div(v-if="item.file")
            v-btn(:href="`edu/download/${item.id}`" fab x-small)
              v-icon mdi-file-check-outline
        td.text-center {{ item.owner }}
</template>

<script>
export default {
  filters: {
    dateFormatter (val) {
      return `${val.slice(0, 10)} ${val.slice(11, 19)}`
    }
  },
  props: {
    category: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      items: [],
      failed: [
        { created_date: '', caption: '교육자료 목록을 가져오는데 실패하였습니다.', file: '', owner: '' },
        { created_date: '', caption: '새로고침을 하여 다시 가져오시기 바랍니다.', file: '', owner: '' },
        { created_date: '', caption: '새로고침을 하여도 실패할 경우, 관리자에게 연락 바랍니다.', file: '', owner: '' }
      ]
    }
  },
  watch: {
    category () { this.getEdu() }
  },
  created  () { this.getEdu() },
  methods: {
    async getEdu () {
      let list
      if (this.category !== 0) {
        list = await this.$axios.$get(`/edu/entry?category=${this.category}`, { withCredentials: true })
          .catch((err) => {
            this.items = this.failed
            throw err
          })
      } else {
        list = await this.$axios.$get('/edu/entry')
          .catch((err) => {
            this.items = this.failed
            throw err
          })
      }
      console.log(list.results)
      this.items = list.results
    }
  }
}
</script>

<style scoped>
</style>
