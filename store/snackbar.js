export const state = () => ({
  snack: '',
  type: '',
  show: false
})

export const mutations = {
  SET_SNACK (state, snack) { state.snack = snack },
  SET_TYPE (state, type) { state.type = type },
  SET_SHOW (state, show) { state.show = show }
}

export const actions = {
  setAlert ({ commit }, value) {
    return new Promise(() => {
      commit('SET_SNACK', value.snack)
      commit('SET_TYPE', value.type)
      commit('SET_SHOW', true)
      return true
    })
  }
}
