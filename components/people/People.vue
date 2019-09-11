<template lang="pug">
  v-container.fluid
    Banner
    div(v-for="(p, i) in people" :key="i")
      // TODO: 학번별로 이 컨테이너 띄우게 만들기.
      v-row
        v-card-title.text-center.display-1.Sans {{ p.title }}
      v-row
        v-divider
      v-row.align-center.justify-center
        v-col(
          v-for="(item, i) in p.items"
          :key="i"
          cols="4"
        )
          PeopleCard(
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
      people: [
        {
          title: '13학번',
          items: [
            {
              fullname: '전재혁',
              nickname: 'Vaelot',
              position: 'Administrator, Developer',
              golink: 'https://vaelot.github.io',
              github: 'https://github.com/vaelot'
            }
          ]
        },
        {
          title: '14학번',
          items: [
            {
              fullname: '유민준',
              nickname: '',
              position: 'Advisor'
            },
            {
              fullname: '우제율',
              nickname: '',
              position: 'Developer'
            }
          ]
        },
        {
          title: '15학번',
          items: [
            {
              fullname: '김범석',
              nickname: '',
              position: 'Administrator, Developer'
            }
          ]
        },
        {
          title: '16학번',
          items: [
            {
              fullname: '배현웅',
              nickname: '',
              position: 'Developer'
            }
          ]
        }, /*
        {
          title: '17학번',
          items: [
            {
              fullname: '누군가',
              nickname: '무언가',
              position: '직책'
            }
          ]
        }, */
        {
          title: '18학번',
          items: [
            {
              fullname: '김동성',
              nickname: '',
              position: 'Accountant, Developer'
            },
            {
              fullname: '유호연',
              nickname: '',
              position: 'Administration, Developer'
            },
            {
              fullname: '이현석',
              nickname: '',
              position: 'Clerk, Developer'
            }
          ]
        },
        {
          title: '19학번',
          items: [
            {
              fullname: '나일현',
              nickname: '',
              position: 'Developer'
            },
            {
              fullname: '박철순',
              nickname: '',
              position: 'Developer'
            },
            {
              fullname: '최재혁',
              nickname: '',
              position: 'Developer'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
