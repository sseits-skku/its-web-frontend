<template lang="pug">
  div
    Banner
    v-container
      // TODO: 학번별로 이 컨테이너 띄우게 만들기.
      v-card-title(
        class="text-center display-2"
      ) help!
      v-divider
      v-row(
        class="align-center justify-center"
      )
        PeopleCard(
          v-for="(item, i) in dummy"
          :key="i"
          :fullname="item.fullname"
          :nickname="item.nickname"
          :position="item.position"
          :golink="item.golink"
          :github="item.github"
        )
</template>

<script>
import Banner from '@/components/content/Banner.vue'
import PeopleCard from '@/components/people/PeopleCard'
export default {
  components: {
    Banner,
    PeopleCard
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
  } // TODO: mounted 만들어서 마운트될때 학번별로 데이터 받아서 분류하기.
}
</script>

<style scoped>
</style>
