<template lang="pug">
  v-container.pa-0.fluid
    Banner(
      img="/img/pattern3.webp"
      title="EDUCATIONS"
      text="SSE-ITS에서 제공하는 교육자료입니다."
    )
    v-row
      v-col(cols="12")
        v-card-title.justify-center.Sans * 혹시 다운로드 에러가 나면 페이지를 새로고침 하시면 됩니다 *
    v-row
      v-col(cols="12")
        v-toolbar.elevation-1(dense floating)
          v-tabs
            v-tab(
              v-for="item in categories"
              :key="item.id"
              @click.native="cat=item.id"
            ) {{ item.title }}
          v-text-field(
            hide-details
            prepend-icon="mdi-magnify"
            single-line
          )
    v-row
      v-col(cols="12")
        Education(:category="cat")
</template>

<script>
import Banner from '@/components/content/Banner'
import Education from '@/components/content/Education'
export default {
  components: {
    Banner,
    Education
  },
  data () {
    return {
      categories: [{ title: '미분류' }],
      cat: 0
    }
  },
  async created () {
    const ret = this.$axios.$get('/edu/category', {})
    if (typeof ret !== 'undefined') {
      this.categories = this.categories.concat((await ret).results)
    }
  }
}
</script>
