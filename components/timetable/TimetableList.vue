<template lang="pug">
  v-simple-table
    template(v-slot:default)
      thead
        tr
          th.text-center.Sans(
            v-for="(d, i) in dayMap"
            :key="i"
          ) {{ d }}
      tbody
        tr(
          v-for="(t, i) in timeMap"
          :key="i"
        )
          td.text-center.Sans {{ t.hour }}:{{ t.minute }}
</template>

<script>
// 데이터 처리법에 대해서는 같은 폴더에 있는 TimeTable.md를 참조하세요.
// 미안합니다...어떤 능력자가 분명히 적당한 WYSIWYG Editor로 만들어 줄 겁니다....
export default {
  data () {
    return {
      // dataMap Format:
      // [
      //   ['유호연', '김동성'],  // 월요일
      //   ['김동성'],           // 화요일
      //   ...
      // ]
      dataMap: [],
      dayMap: ['', '월', '화', '수', '목', '금'],
      timeMap: [],
      timeRange: [18, 36],
      items: []
    }
  },
  mounted () {
    this.clearData()
    this.updateData()
  },
  methods: {
    clearData () {
      this.timeMap = [...Array(48).keys()].map((i) => {
        return {
          hour: ('00' + ~~(i / 2)).slice(-2),
          minute: ('0' + (i % 2) * 30).slice(-2)
        }
      })
    },
    async updateData () {
      this.$axios.setHeader('Authorization', 'Bearer ' +
        this.$store.state.auth.accessToken)
      const receiveData = this.$axios.$get('/timetable/')
      console.log(await receiveData)
    }
  }
}
</script>

<style scoped>
th {
  font-size: 18px;
}
</style>
