export const state = () => ({
  users: []
})

export const mutations = {
  DELETE_USER (state, value) {
    state.users.splice(state.users.findIndex(user => user.name === value.name), 1)
  },

  ADD_USER (state, data) {
    state.users.push(data)
  },

  UPDATE_USER (state, data) {
    state.users.splice(state.users.findIndex(user => user.name === data.name), 1, data)
  },

  ADD_USERS (state, data) {
    state.users = data
  }
}
export const actions = {
  async createUser ({ commit }, data) {
    try {
      const res = await this.$axios.post(`calendar/user`, data)
      commit('ADD_USER', res.data)
    } catch (err) {
      console.log(err) // TODO REPLACE ME WITH FEEDBACK - Move me to an interceptor ???
    }
  },

  async updateUser ({ commit }, user) {
    try {
      const res = await this.$axios.put(`calendar/user?name=${user.name}`, user)
      commit('UPDATE_USER', res.data)
    } catch (err) {
      console.log(err) // TODO REPLACE ME WITH FEEDBACK - Move me to an interceptor ???
    }
  },

  async fetchUsers ({ commit }) {
    try {
      const res = await this.$axios.get(`calendar/user`)
      commit('ADD_USERS', res.data)
    } catch (err) {
      console.log(err) // TODO REPLACE ME WITH FEEDBACK - Move me to an interceptor ???
    }
  },

  async deleteUser ({ commit }, data) {
    try {
      const res = await this.$axios.delete(`calendar/user?name=${data}`)
      commit('DELETE_USER', res.data)
    } catch (err) {
      console.log(err) // TODO REPLACE ME WITH FEEDBACK - Move me to an interceptor ???
    }
  }
}
