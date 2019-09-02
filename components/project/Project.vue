<template lang="pug">
  div
    Banner
    v-container
      v-row(
        class="align-center justify-center"
      )
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
import ProjectItem from '@/components/project/ProjectItem'
export default {
  components: {
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
