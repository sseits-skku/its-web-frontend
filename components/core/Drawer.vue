<template lang="pug">
  v-navigation-drawer(
    v-model="dOpen"
    app
    :permanent="dPerm"
    width="280px"
  )
    v-toolbar.green.darken-2(
      dark
      min-height="60px"
      max-height="80px"
    )
      v-spacer/
      v-btn.elevation-0.transparent(
        :ripple="false"
        block
        @click.native="goPage('/')"
      )
        div.display-1 SSE-ITS
      v-spacer/
    v-list(
      flat
      dense
    )
      v-list-item-group
        template(
          v-if="$store.state.auth.username !== '' | true"
        )
          v-list-item(
            v-for="item in allItems"
            :key="item.title"
            @click.native="goPage(item.id)"
          )
            v-list-item-icon
              v-icon(v-text="item.icon")
            v-list-item-content
              v-list-item-title(v-text="item.title")
        template(
          v-if="$store.state.auth.username !== '' | true"
        )
          v-divider()
          v-subheader.text-center.subtitle-1(inset) Member Zone
          v-list-item(
            v-for="item in memberItems"
            :key="item.title"
            @click.native="goPage(item.id)"
          )
            v-list-item-icon
              v-icon(v-text="item.icon")
            v-list-item-content
              v-list-item-title(v-text="item.title")
        template(
          v-if="$store.state.auth.isStaff | true"
        )
          v-divider()
          v-subheader.text-center.subtitle-1(inset) Staff Zone
          v-list-item(
            v-for="item in staffItems"
            :key="item.title"
            @click.native="goPage(item.id)"
          )
            v-list-item-icon
              v-icon(v-text="item.icon")
            v-list-item-content
              v-list-item-title(v-text="item.title")
    template(v-slot:append)
      div.px-2.pb-2(v-if="$store.state.auth.username === ''")
        v-btn.green.lighten-1(block @click.native="openDialog")
          v-icon(left) mdi-lock-open
          | MEMBER LOGIN
      div.px-2.pb-2(v-if="$store.state.auth.username !== ''")
        v-btn.red.accent-2(block @click.native="logout")
          v-icon(left) mdi-logout-variant
          | LOGOUT
</template>
<script>
export default {
  data () {
    return {
      allItems: [
        { id: 'aboutus', title: 'SSE-ITS 소개', icon: 'mdi-help-circle' },
        { id: 'project', title: '프로젝트', icon: 'mdi-transit-connection-variant' },
        { id: 'education', title: '교육자료', icon: 'mdi-book-open-page-variant' },
        { id: 'people', title: '구성원', icon: 'mdi-account-supervisor-circle' },
        { id: 'recruit', title: '지원하기', icon: 'mdi-account-heart-outline' }
      ],
      memberItems: [
        { id: 'timetable', title: 'OH 시간표', icon: 'mdi-calendar' },
        { id: 'agenda', title: '안건게시판', icon: 'mdi-gavel' },
        { id: 'gallery', title: '갤러리', icon: 'mdi-image-multiple' },
        { id: 'vote', title: '투표', icon: 'mdi-vote' }
      ],
      staffItems: [
        { id: 'inventory', title: '비품관리', icon: 'mdi-package-variant' },
        { id: 'finance', title: '회계관리', icon: 'mdi-cash-100' },
        { id: 'human', title: '인사관리', icon: 'mdi-account-badge-horizontal-outline' }
      ]
    }
  },
  computed: {
    dOpen: {
      get () { return this.$store.state.drawerOpen },
      set (value) { this.$store.commit('setDrawerOpen', value) }
    },
    dPerm: {
      get () { return this.$store.state.drawerPerm },
      set (value) { this.$store.commit('setDrawerPerm', value) }
    }
  },
  methods: {
    logout () {
      this.$store.commit('auth/logout')
    },
    openDialog () {
      this.$store.commit('setLoginDialogOpen', true)
    },
    goPage (id) {
      this.$router.push(id)
    }
  }
}
</script>

<style scoped>
.v-simple-table .thead {
  background-color: black;
}
</style>
