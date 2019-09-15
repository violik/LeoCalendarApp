export const state = () => ({
  events: []
})

export const mutations = {
  DELETE_EVENT (state, value) {
    state.calendar.splice(state.calendar.findIndex(event => event.id === value), 1)
  },

  ADD_EVENT_USER (state, user, data) {
    state.events.push(data)
  },

  ADD_EVENTS (state, data) {
    state.events = data
  },

  UPDATE_EVENTS (state, data) {
    state.events = data
  }
}
export const actions = {
  async createEvent ({
    commit
  }, data) {
    try {
      const res = await this.$axios.post(`calendar/event`, data)
      commit('ADD_EVENT_USER', res.data.user, res.data.event)
    } catch (err) {
      console.log(err) // TODO REPLACE ME WITH FEEDBACK - Move me to an interceptor ???
    }
  },

  async updateEvent ({ commit }, events) {
    try {
      const res = await this.$axios.put(`calendar/event`, events)
      commit('UPDATE_EVENTS', res.data)
    } catch (err) {
      console.log(err) // TODO REPLACE ME WITH FEEDBACK - Move me to an interceptor ???
    }
  },

  async fetchEvents ({ commit }) {
    try {
      const res = await this.$axios.get(`calendar/event`)
      commit('ADD_EVENTS', res.data)
    } catch (err) {
      console.log(err) // TODO REPLACE ME WITH FEEDBACK - Move me to an interceptor ???
    }
  },

  async deleteEvent ({
    commit
  }, id) {
    try {
      await this.$axios.delete(`calendar/event`, id)
      commit('DELETE_EVENT', id)
    } catch (err) {
      console.log(err) // TODO REPLACE ME WITH FEEDBACK - Move me to an interceptor ???
    }
  }
}
