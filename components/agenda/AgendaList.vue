<template lang="pug">
  v-card(
    outlined
  )
    v-toolbar
      v-btn(class="mr-2 pl-3 pr-2" small)
        v-icon(left) mdi-alert-circle-outline
        | {{ numOpen || '0' }} Open
      v-btn(class="ml-2 pl-3 pr-2" small)
        v-icon(left) mdi-check
        | {{ numClosed || '0' }} Closed
      v-spacer
      v-menu(
        v-model="authorMenu"
        :close-on-content-click="false"
        full-width
        offset-y
      )
        template(v-slot:activator="{ on }")
          v-btn(class="mr-2 pl-1 pr-2" small v-on="on")
            v-icon mdi-menu-down
            | 작성자
        v-card
          v-list(class="py-0" dense)
            v-text-field(
              class="mx-3 mt-2"
              label="검색"
              prepend-inner-icon="mdi-magnify"
              rounded
              outlined
              clearable
              single-line
              hide-details
            )
            v-divider(class="my-1")
            v-list-item-group(v-model="authorNum")
              v-list-item(v-for="item in userList" :key="item.id" @click.native="update")
                v-list-item-icon(v-if="authorNum == item.id" class="mr-4")
                  v-icon mdi-check
                v-list-item-content(class="py-0") {{ item | getName }}
      v-menu(
        v-model="labelMenu"
        :close-on-content-click="false"
        full-width
        offset-y
      )
        template(v-slot:activator="{ on }")
          v-btn(class="mx-2 pl-1 pr-2" small v-on="on")
            v-icon mdi-menu-down
            | 라벨
        v-card
          v-list(class="py-0" dense)
            v-text-field(
              class="mx-3 mt-2"
              label="검색"
              prepend-inner-icon="mdi-magnify"
              rounded
              outlined
              clearable
              single-line
              hide-details
            )
            v-divider(class="my-1")
            v-list-item-group(v-model="labelNum")
              v-list-item(v-for="item in labelList" :key="item.id" @click.native="update")
                v-list-item-icon(v-if="labelNum == item.id" class="mr-4")
                  v-icon mdi-check
                v-list-item-content(class="py-0")
                  v-chip(small :color="item.ccode") {{ item.title }}
      v-menu(
        v-model="assigneeMenu"
        :close-on-content-click="false"
        full-width
        offset-y
      )
        template(v-slot:activator="{ on }")
          v-btn(class="mx-2 pl-1 pr-2" small v-on="on")
            v-icon mdi-menu-down
            | 담당자
        v-card
          v-list(class="py-0" dense)
            v-text-field(
              class="mx-3 mt-2"
              label="검색"
              prepend-inner-icon="mdi-magnify"
              rounded
              outlined
              clearable
              single-line
              hide-details
            )
            v-divider(class="my-1")
            v-list-item-group(v-model="assigneeNum")
              v-list-item(v-for="item in userList" :key="item.id" @click.native="update")
                v-list-item-icon(v-if="assigneeNum == item.id" class="mr-4")
                  v-icon mdi-check
                v-list-item-content(class="py-0") {{ item | getName }}
      v-menu(v-model="sortMenu" full-width offset-y)
        template(v-slot:activator="{ on }")
          v-btn(class="ml-2 pl-1 pr-2" small v-on="on")
            v-icon mdi-menu-down
            | 정렬
        v-card
          v-list(class="py-0" dense)
            v-subheader Sort by
            v-list-item-group(v-model="sortNum")
              v-list-item(v-for="item in sortList" :key="item.id" @click.native="update")
                v-list-item-icon(v-if="sortNum == item.id" class="mr-4")
                  v-icon mdi-check
                v-list-item-content(class="py-0") {{ item.title }}
    v-list(
      class="py-0"
      v-for="item in agendaList"
      :key="item.id"
      three-line
    )
      v-list-item
        v-list-item-content(class="py-2")
          v-list-item-title.title {{ item.title }}
          v-list-item-subtitle.subtitle-1
            v-chip(
              class="mx-1"
              v-for="label in item.labels"
              :key="label"
              :color="labelList.find((obj) => obj.id === label).ccode"
              label
              small
            ) {{ labelList.find((obj) => obj.id === label).title }}
          v-list-item-subtitle.subtitle-1
          | {{ item.id | idnizer }}: {{ userList.find((obj) => obj.id === item.owner) | getName | addJosa }} {{ item.created_date | dateString | timeSince }}에 생성.
      v-divider
</template>

<script>
export default {
  filters: {
    idnizer (value) { return '#' + value.toString() },
    getName (value) {
      return (typeof value !== 'undefined')
        ? value.last_name + value.first_name
        : '아무개'
    },
    addJosa (value) {
      console.log(value)
      return (((value.charCodeAt(value.length - 1) - 0xAC00) % 28) > 0)
        ? value + '이'
        : value + '가'
    },
    dateString (value) { return Date.parse(value) },
    timeSince (date) {
      const seconds = Math.floor((new Date() - date) / 1000)
      let interval = Math.floor(seconds / 31536000)
      if (interval > 0) { return interval + '년 전' }
      interval = Math.floor(seconds / 2592000)
      if (interval > 0) { return interval + '달 전' }
      interval = Math.floor(seconds / 86400)
      if (interval > 0) { return interval + '일 전' }
      interval = Math.floor(seconds / 3600)
      if (interval > 0) { return interval + '시간 전' }
      interval = Math.floor(seconds / 60)
      if (interval > 0) { return interval + '분 전' }
      interval = Math.floor(seconds)
      if (interval > 20) { return Math.floor(seconds) + '초 전' }
      return '몇초 전'
    }
  },
  data () {
    return {
      authorNum: 0,
      labelNum: 0,
      assigneeNum: 0,
      sortNum: 0,
      authorMenu: false,
      labelMenu: false,
      assigneeMenu: false,
      sortMenu: false,
      userList: [],
      labelList: [],
      sortList: [
        { id: 0, q: 'sort:created-dsc', title: '최근 안건' },
        { id: 1, q: 'sort:created-asc', title: '오래된 안건' },
        { id: 2, q: 'sort:comments-most', title: '코멘트 많은 순' },
        { id: 3, q: 'sort:comments-least', title: '코멘트 적은 순' },
        { id: 4, q: 'sort:updated-dsc', title: '최근에 갱신된 순' },
        { id: 5, q: 'sort:updated-dsc', title: '오래 갱신된 순' }/*,
        { id: 6, q: 'sort:reactions-dsc', title: '가장 많은 반응들' } */
      ],
      agendaList: [],
      numOpen: 10,
      numClosed: 10
    }
  },
  computed: {
    query () {
      return {
        author: this.authorNum === 0
          ? undefined : this.userList[this.authorNum].id,
        label: this.labelNum === 0
          ? undefined : this.labelList[this.labelNum].id,
        assignee: this.assigneeNum === 0
          ? undefined : this.userList[this.assigneeNum].id,
        sort: this.sortList[this.sortNum].q
      }
    }
  },
  async mounted () {
    await this.$store.dispatch('auth/checkLogin')
    this.$axios.setHeader('Authorization', 'Bearer ' + this.$store.state.auth.accessToken)
    const labelResult = this.$axios.$get('/agenda/label/')
    const userResult = this.$axios.$get('/account/user/')
    const agendaResult = this.$axios.$get('/agenda/ag/')
    this.labelList = [
      { id: 0, title: '선택없음', ccode: '#aaaaaa' }
    ].concat((await labelResult).results)
    this.userList = [
      { id: 0, last_name: '전체', first_name: ' 보기' }
    ].concat((await userResult).results)
    this.agendaList = (await agendaResult).results
  },
  methods: {
    async update () {
      await this.$store.dispatch('auth/checkLogin')
      this.$axios.setHeader('Authorization', 'Bearer ' + this.$store.state.auth.accessToken)
      const agendaResult = this.$axios.$get('/agenda/ag/', this.query)
      this.agendaList = (await agendaResult).results
    }
  }
}
</script>

<style scoped>
.v-card {
  min-width: 100%;
  min-height: 100%;
}
</style>
