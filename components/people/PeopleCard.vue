<template lang="pug">
  v-card(
    max-width="280px"
    max-height="200px"
    class="ma-2"
  )
    v-card-title(
      class="align-end justify-end fill-width fill-height"
    ) {{ fullname }}
    v-card-text(class="pa-2")
      span {{ position }}
      br
      span(class="text--primary") 닉네임: {{ nickname }}
    v-card-actions(
      class="pt-0"
    )
      v-spacer
      v-btn(
        v-show="typeof golink !== 'undefined'"
        text
        icon
        :href="golink"
      )
        v-icon mdi-home
      v-btn(
        v-show="typeof github !== 'undefined'"
        text
        icon
        :href="github"
      )
        v-icon mdi-github-face
</template>

<script>
export default {
  props: {
    fullname: { type: String, default: '김아무개' },
    nickname: { type: String, default: 'kill-20000' },
    position: { type: String, default: 'Developer' },
    golink: { type: String, default: 'https://www.naver.com' },
    github: { type: String, default: 'https://www.github.com/sseits-skku' }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>
