import { getApiClient } from '../axios.clients'

export const getBalance = async () => {
  const clientApi = getApiClient()
  return await clientApi.get('/balance')
}

export const getBalanceByID = async (id: any) => {
  const clientApi = getApiClient()
  return await clientApi.get(`/balance?id=${id}`)
}

export const postBalance = async (body: any) => {
  const clientApi = getApiClient()
  return await clientApi.post(`/balance`, body)
}

export const putBalance = async (body: any) => {
  const clientApi = getApiClient()
  return await clientApi.put(`/balance`, body)
}
