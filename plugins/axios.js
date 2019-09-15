// eslint-disable-next-line no-unused-vars
export default ({ $axios }) => {
  // Interceptor for trace source error
  $axios.onError((err) => {
    console.log(
      `[${err.response && err.response.status}] ${err.response &&
        err.response.request.path}`
    )
    console.log(err.response && err.response.data)
  })
}
