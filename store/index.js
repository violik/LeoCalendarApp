export const state = () => ({
})

export const mutations = {
}
export const actions = {
  async nuxtServerInit ({ dispatch }) {
    await dispatch('users/fetchUsers')
    await dispatch('event/fetchEvents')
  }
}
