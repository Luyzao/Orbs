import { getApiClient } from '../axios.clients'

export const getUser = async () => {
  const clientApi = getApiClient()
  return await clientApi.get('/user')
}

export const getUserByID = async (id: any) => {
  const clientApi = getApiClient()
  return await clientApi.get(`/user?id=${id}`)
}

export const postUser = async (body: any) => {
  const clientApi = getApiClient()
  return await clientApi.post(`/user`, body)
}

export const putUser = async (body: any) => {
  const clientApi = getApiClient()
  return await clientApi.put(`/user`, body)
}
