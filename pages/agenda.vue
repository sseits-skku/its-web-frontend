<template lang="pug">
  v-container.fluid.fill-height
    v-col
      v-row.align-center.justify-center
        h1 GitLab으로 이동합니다. 자동으로 이동하지 않을 경우, 아래 버튼을 눌러주세요.
      v-row.align-center.justify-center.pt-5
        v-btn.primary GitLab으로 가기
</template>

<script>
export default {
  mounted () {
    location.replace('http://115.145.208.23/gitlab')
  }
}
</script>
