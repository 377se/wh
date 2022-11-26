export default function ({ $axios, store, redirect }) {
  $axios.onError(error => {
    if(error.response.status === 401) {
      store.dispatch('logout')
      redirect('/login_page_auth')
    }
  })
}