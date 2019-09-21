import Cookie from 'js-cookie'
import router from '../router'

const _config = ({ access }) => ({
  headers: {
    Authorization: 'Bearer ' + access
  }
})

export const state = () => ({
  username: '',
  refresh: '',
  access: '',
  isAdmin: false
})

export const mutations = {
  SET_AUTH (state, auth) { Object.assign(state, auth) },
  SET_USERNAME (state, username) { state.username = username },
  SET_REFRESH (state, refresh) { state.refresh = refresh },
  SET_ACCESS (state, access) { state.access = access },
  FLUSH_AUTH (state) {
    state.username = ''
    state.refresh = ''
    state.access = ''
    state.isAdmin = false
    Cookie.remove('Authorization')
  }
}

export const actions = {
  _logout ({ commit }) {
    return new Promise(() => {
      commit('FLUSH_AUTH')
      router.push('/')
      return false
    })
  },
  _kickout ({ dispatch }, message) {
    return new Promise(() => {
      dispatch(
        'snackbar/setAlert',
        { snack: message, type: 'error' },
        { root: true }
      )
      dispatch('_logout')
      return false
    })
  },
  _readCookie ({ commit, dispatch }) {
    return new Promise(() => {
      const cData = Cookie.get('Authorization')
      if (typeof cData !== 'undefined') {
        commit('SET_AUTH', cData)
        return true
      } else {
        dispatch('_kickout')
        return false
      }
    })
  },
  _writeCookie ({ state }) { Cookie.set('Authorization', state) },
  _verifyAccess ({ state }) {
    return this.$axios.$post(
      '/auth/verify',
      { token: state.access }
    ).then(() => true).catch(() => false)
  },
  _refreshAccess ({ state, commit }) {
    return this.$axios.$post(
      '/auth/refresh',
      { refresh: state.refresh }
    ).then(({ access }) => {
      commit('SET_ACCESS', access)
      return true
    }).catch(() => false)
  },
  _sanitizeAuth: async ({ dispatch }) => {
    const v = dispatch('_verifyAccess')
    const r = dispatch('_refreshAccess')
    await  || await 
  },
  _isLogin ({ state, dispatch }) {
    // TODO: refactor me.
    if (state.username === '' && !dispatch('_readCookie')) { return false }
    return dispatch('_sanitizeAuth')
  },
  doLogin ({ commit, dispatch }, obj) {
    const retval = dispatch('authPost', {
      path: '/auth/',
      body: obj,
      msg: '로그인에 실패하였습니다. 아이디와 비밀번호를 다시 입력해 주세요.'
    })
    if (retval) {
      const userInfo = dispatch('authGet', {
        path: `/account/user/${JSON.parse(atob(retval.access.split('.')[1])).user_id}`,
        kickout: true,
        msg: '사용자 정보 조회에 실패하였습니다. 관리자에게 문의 바랍니다.'
      })
      commit('SET_AUTH', Object.assign({
        username: obj.username,
        isAdmin: userInfo.is_staff | userInfo.is_superuser
      }, retval))
    }
    return !!retval
  },
  checkLogin ({ dispatch }, kickout) {
    return dispatch('_isLogin')
      ? dispatch('_writeCookie')
      : kickout
        ? dispatch('_kickout', '로그인이 필요한 페이지입니다.')
        : dispatch('_logout')
  },
  plainGet: ({ path }) => this.$axios.$get(path),
  plainPost: ({ path, body }) => this.$axios.$post(path, body),
  plainPatch: ({ path, body }) => this.$axios.$patch(path, body),
  plainDelete: ({ path }) => this.$axios.$delete(path),
  _authFunc: ({ state, dispatch }, func, { path, body, kickout, msg }) =>
    dispatch('_sanitizeAuth')
      ? func(path, body || {}, _config(state))
      : kickout ? dispatch('_kickout', msg || '로그인 해 주세요.')
        : dispatch('snackbar/setAlert', { snack: msg || '로그인 해 주세요.', type: 'error' }, { root: true }),
  authGet: ({ dispatch }, obj) => dispatch('_authFunc', this.$axios.$get, obj),
  authPost: ({ dispatch }, obj) => dispatch('_authFunc', this.$axios.$post, obj),
  authPatch: ({ dispatch }, obj) => dispatch('_authFunc', this.$axios.$patch, obj),
  authDelete: ({ dispatch }, obj) => dispatch('_authFunc', this.$axios.$delete, obj)
}
