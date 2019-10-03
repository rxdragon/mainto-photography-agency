import axios from 'axios'

var instance = axios.create({ timeout: 1000 * 12 })

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

instance.interceptors.request.use(
  config => {    
    return config
  },
  error => Promise.error(error)
)

instance.interceptors.response.use(
  res => res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res),
  error => {
    const { response } = error
    if (response) {
      return Promise.reject(response)
    }
  }
)

export default instance
