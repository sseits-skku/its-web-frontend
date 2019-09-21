<template lang="pug">
  v-dialog(
    v-model="diaOpen"
    width="480px"
  )
    v-card.elevation-12
      v-toolbar.green.lighten-2(dark flat)
        v-toolbar-title Member Login
        v-spacer/
        v-btn.red(rounded @click.native="diaOpen = false")
          v-icon mdi-close
      v-card-text.mt-4
        v-text-field(
          v-model="id"
          label="Login"
          name="login"
          prepend-icon="mdi-account"
          type="text"
          @keyup.enter.native="postLogin"
        )
        v-text-field(
          v-model="pw"
          label="Password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          @keyup.enter.native="postLogin"
        )
      v-card-actions
        v-spacer/
        v-btn.green.lighten-2.mb-4(
          fab
          rounded
          :loading="isPending"
          @click.native="postLogin"
          @keyup.enter.native="postLogin"
        )
          v-icon mdi-send
        v-spacer/
</template>

<script>
export default {
  data: () => ({
    isPending: false,
    id: '',
    pw: ''
  }),
  computed: {
    diaOpen: {
      get () { return this.$store.state.loginDialogOpen },
      set (value) { this.$store.commit('setLoginDialogOpen', value) }
    }
  },
  created () {
  },
  methods: {
    async postLogin () {
      this.isPending = true
      try {
        const { access, refresh } = await this.$axios.$post('/auth/', {
          username: this.id,
          password: this.pw
        })
        const userId = JSON.parse(atob(access.split('.')[1])).user_id
        this.$axios.setHeader('Authorization', 'Bearer ' + access)
        const info = await this.$axios.$get(`/account/user/${userId}`)
        this.$store.commit('auth/setLogin', {
          username: this.id,
          refresh,
          access,
          isAdmin: !!(info.is_staff | info.is_superuser)
        })
        this.id = ''
        this.pw = ''
        this.diaOpen = false
        this.isPending = false
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
