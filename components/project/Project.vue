<template lang="pug">
  div
    Banner(
      img="/img/pattern.webp"
      title="PROJECTS"
      text="SSE-ITS가 진행한 프로젝트들을 소개합니다."
    )
    v-container
      v-row.align-center.justify-center
        ProjectItem(
          v-for="(item, i) in dummy"
          :key="i"
          :image="item.image"
          :title="item.title"
          :author="item.author"
          :text="item.text"
          :golink="item.golink"
          :github="item.github"
        )
</template>

<script>
import Banner from '@/components/content/Banner.vue'
import ProjectItem from '@/components/project/ProjectItem'
export default {
  components: {
    Banner,
    ProjectItem
  },
  data () {
    return {
      defaultImage: '',
      dummy: [
        {
          image: '/img/aboutus.jpg'
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ]
    }
  }
}
</script>

<style scoped>
</style>
