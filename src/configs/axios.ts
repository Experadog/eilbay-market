import { Mutex } from 'async-mutex'
import axios from 'axios'
import Cookies from 'js-cookie'

const version = 'v1'
export const BASE_API_URL = `http://eilbay.com/api/${version}`

export const axiosRequest = axios.create({ baseURL: BASE_API_URL })

const mutex = new Mutex()

axiosRequest.interceptors.request.use(
  config => {
    const accessToken = Cookies.get('accessToken')

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  error => Promise.reject(error),
)

axiosRequest.interceptors.response.use(
  response => response,
  async error => {
    await mutex.waitForUnlock()

    if (error.response?.status === 401 && !error.config._retry && window.location.pathname !== '/auth/signin') {
      const originalRequest = error.config
      originalRequest._retry = true

      if (!mutex.isLocked()) {
        const release = await mutex.acquire()

        try {
          await refreshAccessToken()

          const accessToken = Cookies.get('accessToken')

          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

          return axiosRequest(originalRequest)
        } finally {
          release()
        }
      }
    }

    return Promise.reject(error)
  },
)

async function refreshAccessToken() {
  const refreshToken = Cookies.get('refreshToken')

  if (!refreshToken) return window.location.href = '/auth/signin'

  try {
    const response = await axios.post<{ access: string }>(`${BASE_API_URL}/accounts/token/refresh/`, {
      refresh: refreshToken,
    })

    if (response.data) {
      Cookies.set('accessToken', response.data.access, { expires: 1 })
    }
  } catch (error) {
    window.location.href = '/auth/signin'
  }
}

export default axiosRequest
