import Cookie from 'js-cookie'

export const state = () => ({
  username: '',
  refreshToken: '',
  accessToken: '',
  isStaff: false
})

export const mutations = {
  setLogin (state, auth) {
    state.username = auth.username
    state.refreshToken = auth.refresh
    state.accessToken = auth.access
    state.isStaff = auth.isStaff
    Cookie.set('Authorization', {
      username: auth.username,
      isStaff: auth.isStaff,
      refresh: auth.refresh,
      access: auth.access
    })
  },
  logout (state) {
    state.username = ''
    state.refreshToken = ''
    state.accessToken = ''
    state.isStaff = false
    Cookie.remove('Authorization')
  }
}

export const actions = {
  async checkLogin (context, router) {
    try {
      const cAuth = Cookie.get('Authorization')
      if (typeof cAuth === 'undefined') {
        throw new TypeError('로그인 해 주세요.')
      }
      const auth = JSON.parse(cAuth)
      const resAccess = await this.$axios.$post('/auth/verify', {
        token: auth.access
      })
      const resRefresh = await this.$axios.$post('/auth/verify', {
        token: auth.refresh
      })
      if (Object.entries(resRefresh).length === 0 &&
          resRefresh.constructor === Object) {
      // refresh token is valid.
        if (Object.entries(resAccess).length !== 0 &&
            resAccess.constructor === Object) {
        // access token is NOT valid.
          const { access, refresh } = await this.$axios.$post(
            '/auth/refresh',
            { refresh: auth.refresh }
          )
          auth.refresh = refresh
          auth.access = access
        }
        context.commit('setLogin', auth)
      } else {
        throw new TypeError('토큰이 만료되었습니다. 다시 로그인 해 주세요.')
      }
    } catch (err) {
      // invalid cookie and logout.
      console.log(err)
      context.commit('logout')
      context.commit('snackbar/setSnack', err, 'error')
      router.push('/')
    }
  }
}
