<template lang="pug">
  div
    Banner(
      img="/img/pattern.webp"
      title="PROJECTS"
      text="SSE-ITS가 진행한 프로젝트들을 소개합니다."
    )
    v-container
      v-row.align-center.justify-center
        v-col(
          v-for="(item, i) in dummy"
          :key="i"
          :cols="getCols"
        )
          ProjectItem.mx-auto(
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
          image: '/img/aboutus.jpg',
          title: '반도체과 홈페이지',
          author: '18학번 유호연',
          text: '반도체시스템공학과 홈페이지를 리뉴얼하였습니다.',
          golink: 'https://semi.skku.edu'
        },
        {
          image: '/img/aboutus.jpg',
          title: 'SSE-ITS 홈페이지',
          author: '13학번 전재혁',
          text: 'SSE-ITS 홈페이지를 제작하였습니다.',
          golink: 'https://semi.skku.edu/sseits',
          github: 'https://github.com/sseits-skku/itsweb'
        },
        {
          image: '/img/aboutus.jpg',
          title: '반도체시스템공학과 예약 서비스',
          author: '13학번 전재혁',
          text: '반도체시스템공학과 예약 서비스를 제작하였습니다. 세미나실과 학생증 등록을 간편하게 예약할 수 있습니다.',
          golink: 'https://semi.skku.edu/sseits',
          github: 'https://github.com/sseits-skku/yeyag'
        },
        {
          image: '/img/aboutus.jpg',
          title: 'SSE-ITS Deploy Service',
          author: '13학번 전재혁',
          text: '서비스 배포를 간편하게 하기 위해 배포시스템을 만들었습니다. Jenkins를 이용하였습니다.',
          golink: 'https://semi.skku.edu/sseits',
          github: 'https://github.com/sseits-skku/yeyag'
        }
      ]
    }
  },
  computed: {
    getCols () {
      return this.$vuetify.breakpoint.name === 'xs'
        ? 12 : this.$vuetify.breakpoint.name === 'sm'
          ? 6 : this.$vuetify.breakpoint.name === 'md'
            ? 4 : this.$vuetify.breakpoint.name === 'lg'
              ? 3 : 2
    }
  }
}
</script>

<style scoped>
</style>
