export const state = () => ({
  calendar: []
})

export const mutations = {
  SET_DATA (state, value) {
    state.calendar = value
  }
}
export const actions = {
  async fetchData ({ commit }) {
    try {
      const res = await this.$axios.get(`calendar/load`)
      commit('SET_DATA', res.data)
    } catch (err) {
      console.log(err) // TODO REPLACE ME WITH FEEDBACK - Move me to an interceptor ???
    }
  },
  async nuxtServerInit ({ dispatch }) {
    // await dispatch('fetchData')
    await dispatch('users/fetchUsers')
    await dispatch('event/fetchEvents')
  }
}
