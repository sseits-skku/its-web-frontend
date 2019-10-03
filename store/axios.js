export const state = () => ({
  username: '',
  userId: null,
  isAdmin: false
})

export const mutations = {
  SET_AUTH (state, auth) {
    state.username = auth.username
    state.userId = auth.userId
    state.isAdmin = auth.isAdmin
  },
  FLUSH_AUTH (state) {
    state.username = ''
    state.userId = null
    state.isAdmin = false
  }
}

// TODO: 응 JWT 없앴어 너무 짜증나서 없앴어
// 다시 짜야해 씨발
export const actions = {
  logout: ({ commit }, { axios, router }) => {
    commit('FLUSH_AUTH')
    axios.$post('/logout/', {})
    router.push('/')
  },
  kickout: ({ dispatch, commit }, message) => {
    dispatch(
      'snackbar/setAlert',
      { snack: message, type: 'error' },
      { root: true }
    )
    commit('FLUSH_AUTH')
    this.$router.push('/')
  },
  isLogin: async ({ commit }, { axios }) => {
    try {
      const res = await axios.$get('/account/which')
      commit('SET_AUTH', {
        username: res.username,
        userId: res.userId,
        isAdmin: res.isAdmin
      })
      return true
    } catch (err) {
      return false
    }
  },
  doLogin: async ({ commit, dispatch }, { axios, obj }) => {
    try {
      const userInfo = await axios.$post('/login/', obj)
      commit('SET_AUTH', {
        username: userInfo.username,
        userId: userInfo.id,
        isAdmin: userInfo.is_superuser
      })
      return true
    } catch (err) {
      console.error(err)
      dispatch(
        'snackbar/setAlert',
        { snack: '아이디 혹은 비밀번호를 다시 확인해 주세요.', type: 'error' },
        { root: true }
      )
      return false
    }
  },
  debug: ({ state }, { axios }) => {
    console.log(axios.defaults.xsrfCookieName)
    console.log(axios.defaults.xsrfHeaderName)
  }
}
