<template lang="pug">
  v-card.my-2.mx-auto(
    max-width="280px"
    max-height="200px"
  )
    v-card-title.align-center.justify-center.pb-0 {{ fullname }}
    v-card-text.text-center.py-2 {{ position }}
    v-card-text.text--primary.py-0(v-if="nickname !== ''") 닉네임: {{ nickname }}
    v-card-actions.pt-0(v-if="golink || github")
      v-spacer
      v-btn(
        v-if="typeof golink !== 'undefined'"
        text
        icon
        :href="golink"
      )
        v-icon mdi-home
      v-spacer
      v-btn(
        v-if="typeof github !== 'undefined'"
        text
        icon
        :href="github"
      )
        v-icon mdi-github-face
      v-spacer
</template>

<script>
export default {
  props: {
    fullname: { type: String, default: undefined },
    nickname: { type: String, default: undefined },
    position: { type: String, default: 'Developer' },
    golink: { type: String, default: undefined },
    github: { type: String, default: undefined }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>
