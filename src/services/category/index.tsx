import { getApiClient } from '../axios.clients'

export const getCategory = async () => {
  const clientApi = getApiClient()
  return await clientApi.get('/category')
}
