<template lang="pug">
  v-row
    v-col
      v-sheet(height="600px")
       v-calendar(
         start="2018-01-01"
         end="2018-01-05"
         first-interval="17"
         interval-count="20"
         interval-minutes="30"
         :interval-style="intStyle"
         :events="events"
         :event-color="getEventColor"
         color="primary"
         type="week"
         :weekdays="[1,2,3,4,5]"
       )
</template>

<script>
import { groupBy, mapValues, omit } from 'lodash'
// 데이터 처리법에 대해서는 같은 폴더에 있는 TimeTable.md를 참조하세요.
// 어떤 능력자가 적당한 WYSIWYG Editor로 만들어 줬으면 좋겠네요...
export default {
  data () {
    return {
      today: '',
      events: [
        /*
        {
          name: '전재혁',
          start: '2018-01-02 09:00',
          end: '2018-01-02 12:00',
          color: 'blue'
        }
        */
      ],
      defaultEvents: [],
      editedEvents: []
    }
  },
  mounted () {
  },
  methods: {
    intStyle (interval) {
      const inactive = interval.weekday === 0 ||
        interval.weekday === 6 ||
        interval.hour < 9 ||
        interval.hour >= 18
      const startOfHour = interval.minute === 0
      const dark = this.dark
      const mid = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'

      return {
        backgroundColor: inactive ? (dark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.05)') : undefined,
        borderTop: startOfHour ? undefined : '1px dashed ' + mid
      }
    },
    getEventColor (e) { return e.color },
    async retrieveData () {
      const sem = (await this.$axios.$get('/timetable'))[0].semester
      const entries = this.$axios.$get('/timetable/entry')
      const result = mapValues(
        groupBy(await entries, 'ohtable'),
        (el) => el.map(
          (e) => omit(e, 'ohtable')
        )
      )
      console.log(result)
    }
  }
}
</script>

<style scoped>
th {
  font-size: 18px;
}
</style>
