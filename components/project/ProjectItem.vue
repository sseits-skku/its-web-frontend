<template lang="pug">
  v-card.ma-2(
    min-width="200px"
    min-height="260px"
    max-width="400px"
    max-height="460px"
  )
    v-img(
      min-width="200px"
      min-height="140px"
      max-width="400px"
      max-height="200px"
      :src="typeof image !== undefined ? image : defaultImage"
    )
      v-card-title.align-end.justify-end.fill-width.fill-height.headline.Serif {{ title }}
    v-card-text.pa-2.subtitle-1.Sans
      span 기여자: {{ author }}
      br
      span.text--primary {{ text }}
    v-card-actions.pt-0
      v-spacer
      v-btn(
        v-show="typeof golink !== 'undefined'"
        text
        icon
        :href="golink"
      )
        v-icon mdi-exit-to-app
      v-btn(
        v-show="typeof github !== 'undefined'"
        text
        icon
        :href="github"
      )
        v-icon mdi-github-box
</template>

<script>
export default {
  props: {
    image: { type: String, default: '/img/dummy_logo.png' },
    title: { type: String, default: '' },
    author: { type: String, default: '' },
    text: { type: String, default: '' },
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
