import { getApiClient } from '../axios.clients'

export const getIncome = async () => {
  const clientApi = getApiClient()
  return await clientApi.get('/income')
}

export const getIncomeByID = async (id: any) => {
  const clientApi = getApiClient()
  return await clientApi.get(`/income?id=${id}`)
}

export const postIncome = async (body: any) => {
  const clientApi = getApiClient()
  return await clientApi.post(`/income`, body)
}

export const putIncome = async (body: any) => {
  const clientApi = getApiClient()
  return await clientApi.put(`/income`, body)
}
