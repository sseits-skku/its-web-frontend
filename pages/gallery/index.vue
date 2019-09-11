<template lang="pug">
  v-container.fluid.fill-height
    GalleryList(:items="galleryItems")
</template>

<script>
import GalleryList from '@/components/gallery/GalleryList'
export default {
  components: {
    GalleryList
  },
  data () {
    return {
      galleryItems: [
        { id: 1, title: '잘 되어가나요?', d: '2019-12-21', repImg: '/img/aboutus.jpg' },
        { id: 2, title: '안되어가네요 ㅠㅠ', d: '2019-11-12', repImg: '/img/aboutus.jpg' },
        { id: 3, title: '즐거운 우리들', d: '', repImg: '/img/aboutus.jpg' },
        { id: 4, title: '행복한 하루', d: '', repImg: '/img/aboutus.jpg' },
        { id: 5, title: '', d: '', repImg: '/img/aboutus.jpg' },
        { id: 6, title: '', d: '', repImg: '/img/aboutus.jpg' },
        { id: 7, title: '', d: '', repImg: '/img/aboutus.jpg' },
        { id: 8, title: '', d: '', repImg: '/img/aboutus.jpg' },
        { id: 9, title: '', d: '', repImg: '/img/aboutus.jpg' },
        { id: 10, title: '', d: '', repImg: '/img/aboutus.jpg' },
        { id: 11, title: '', d: '', repImg: '/img/aboutus.jpg' }
      ]
    }
  },
  mounted () {
    // TODO: load galleryItems from backend.
  }
}
</script>
