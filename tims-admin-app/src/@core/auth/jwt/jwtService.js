import axios from 'axios'
import jwtDefaultConfig from './jwtDefaultConfig'
import { base_url } from "@src/utility/baseUrl"
import { config } from "@src/utility/axiosconfig"
import { Slide, toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
export default class JwtService {
  // ** jwtConfig <= Will be used by this service
  jwtConfig = { ...jwtDefaultConfig }

  // ** For Refreshing Token
  isAlreadyFetchingAccessToken = false

  // ** For Refreshing Token
  subscribers = []

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    // ** Request Interceptor
    axios.interceptors.request.use(
      config => {
        // ** Get token from localStorage
        const accessToken = this.getToken()

        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          // ** eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    // ** Add request/response interceptor
    axios.interceptors.response.use(
      response => response,
      error => {
        // ** const { config, response: { status } } = error
        const { config, response } = error
        const originalRequest = config
        // ** if (status === 401) {
        if (response && response.data?.message === "Not Authorized token expired, Please Login again") {
          localStorage.removeItem('timsAdminuserData')
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          toast.info(
            'Votre session a expiré, vous serez redirigé dans 3s. Veuillez vous reconnecter!',
            { transition: Slide, hideProgressBar: true, autoClose: 3000 }
          )
          setTimeout(() => {
            window.location.href='/login'
          }, 3000);
          return null
        }
        return Promise.reject(error)
      }
    )
    
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken))
  }

  addSubscriber(callback) {
    this.subscribers.push(callback)
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value)
  }

  refreshToken() {
    const instance = axios.create({
      withCredentials: true,
      baseURL: base_url
   })
    return instance.get(`user/refresh`)
  }

}
