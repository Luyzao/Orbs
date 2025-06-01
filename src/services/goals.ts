import { supabase } from '../../lib/supabaseClient'
import { v4 as uuidv4 } from 'uuid'

export type GoalInput = {
  title: string
  target: number
  progress: number
  categoryId: string
  imageUrl: string
  userId: string
}
export async function addGoal(goal: GoalInput) {
  const payload = {
    id: uuidv4(), // GERA O ID
    ...goal,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  }

  console.log('Payload enviado para Supabase:', payload)

  const { data, error } = await supabase.from('Goal').insert([payload])

  if (error) {
    console.error('Erro do Supabase ao inserir:', error)
    throw error
  }

  console.log('Meta criada com sucesso:', data)
  return data
}

export async function getGoalsByUser(userId: string) {
  const { data, error } = await supabase
    .from('Goal')
    .select('*')
    .eq('userId', userId)

  if (error) throw error
  return data
}

export async function updateGoal(id: string, updatedData: Partial<GoalInput>) {
  const { data, error } = await supabase
    .from('Goal')
    .update(updatedData)
    .eq('id', id)

  if (error) throw error
  return data
}

export async function deleteGoal(id: string) {
  const { data, error } = await supabase.from('Goal').delete().eq('id', id)

  if (error) throw error
  return data
}
