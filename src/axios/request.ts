/**
 * 网络请求：axios
 * @author songmm
 */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

/**
 * Axios Client
 */
export class AxiosClientClass {
  readonly instance: AxiosInstance

  constructor(public config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    // 全局请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        // 在发送请求之前做些什么
        const params = config.params
        // 去除key为"" | null | undefined的参数
        if (params) {
          Object.keys(params).forEach((key) => {
            if (!params[key]) {
              delete params[key]
            }
          })
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 全局响应拦截
    this.instance.interceptors.response.use(
      (response) => {
        return response.data
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }

  // 封装get请求
  get<T>(url: string, params?: T): Promise<T> {
    return this.instance.get(url, { params })
  }

  // 封装post请求
  post<T>(url: string, data?: T): Promise<T> {
    return this.instance.post(url, data)
  }

  // 封装put请求
  put<T>(url: string, data?: T): Promise<T> {
    return this.instance.put(url, data)
  }

  // 封装delete请求
  delete<T>(url: string, params?: T): Promise<T> {
    return this.instance.delete(url, { params })
  }
}
