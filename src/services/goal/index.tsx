import { getApiClient } from '../axios.clients'

export const getGoal = async () => {
  const clientApi = getApiClient()
  return await clientApi.get('/goal')
}

export const getGoalByID = async (id: any) => {
  const clientApi = getApiClient()
  return await clientApi.get(`/goal?id=${id}`)
}

export const postGoal = async (body: any) => {
  const clientApi = getApiClient()
  return await clientApi.post(`/goal`, body)
}

export const putGoal = async (body: any) => {
  const clientApi = getApiClient()
  return await clientApi.put(`/goal`, body)
}
