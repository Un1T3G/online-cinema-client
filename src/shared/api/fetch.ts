import { ApiInstance } from './api-instance'
import { UseAuthInterceptors } from './interceptors'

const BASE_URL = `${process.env.SERVER_URL}/api/`

const fetchClassic = new ApiInstance(BASE_URL)

const fetchAuth = new ApiInstance(BASE_URL)
new UseAuthInterceptors(fetchAuth)

export { fetchAuth, fetchClassic }
