import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export class ApiInstance {
  private axios: AxiosInstance

  constructor(baseUrl: string) {
    this.axios = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }

  get instance() {
    return this.axios
  }

  async get<T>(endPoint: string, options: AxiosRequestConfig = {}) {
    const response = await this.axios.get<T>(endPoint, options)
    return response.data
  }

  async post<T>(endPoint: string, data: any, options: AxiosRequestConfig = {}) {
    const response = await this.axios.post<T>(endPoint, data, options)
    return response.data
  }

  async put<T>(endPoint: string, data: any, options: AxiosRequestConfig = {}) {
    const response = await this.axios.put<T>(endPoint, data, options)
    return response.data
  }

  async delete<T>(endPoint: string, options: AxiosRequestConfig = {}) {
    const response = await this.axios.delete<T>(endPoint, options)
    return response.data
  }
}
