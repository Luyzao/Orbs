import { getApiClient } from '../axios.clients'

export const getExpense = async () => {
  const clientApi = getApiClient()
  return await clientApi.get('/expense')
}

export const getExpensesByUserId = async (userId: string) => {
  const clientApi = getApiClient()
  return await clientApi.get(`/expense?userId=${userId}`)
}

export const postExpense = async (body: any) => {
  const clientApi = getApiClient()
  return await clientApi.post(`/expense`, body)
}

export const putExpense = async (body: any) => {
  const clientApi = getApiClient()
  return await clientApi.put(`/expense`, body)
}
