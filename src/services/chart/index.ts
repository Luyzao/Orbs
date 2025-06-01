import { getApiClient } from '../axios.clients'

export const getChartData = async (userId: string, date: Date) => {
  const clientApi = getApiClient()
  return await clientApi.get(`/chart?userId=${userId}&date=${date.toISOString()}`)
}


export const getChartByID = async (id: any) => {
  const clientApi = getApiClient()
  return await clientApi.get(`/chart?id=${id}`)
}