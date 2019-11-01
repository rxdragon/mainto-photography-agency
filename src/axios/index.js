import axios from 'axios'
import store from '../store'
import { errorCode } from '../errorCode.js'
const errorHandle = (status) => {
  switch (status) {
    case 401:
      window.localStorage.clear()
      window.location.reload()
      break
  }
}

var instance = axios.create({ timeout: 1000 * 12 })
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

instance.interceptors.request.use(
  config => {
    let steamId = store.getters.getSteamId
    if (steamId) { config.headers['x-stream-id'] = steamId }
    return config
  },
  error => Promise.error(error)
)

instance.interceptors.response.use(
  res => {
    if (res.headers['x-stream-id']) { store.dispatch('setSteamId', res.headers['x-stream-id']) }
    return Promise.resolve(res.data)
  },
  error => {
    const { response } = error
    if (response) {
      errorHandle(response.status)
      response.data.error_msg = errorCode.getMsg(response.data)
      return Promise.reject(response)
    }
  }
)

export default instance