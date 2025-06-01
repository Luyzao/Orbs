import DoughnutChartDemo from '@/components/homeChart'
import ToolBar from '@/components/toolBar'
import { FiPlusCircle } from 'react-icons/fi'
import React, { useEffect, useRef, useState } from 'react'
import { Calendar } from 'primereact/calendar'
import { Nullable } from 'primereact/ts-helpers'
import GoalsList from '@/components/goals'
import DespesasList from '@/components/despesasList'
import { supabase } from 'lib/supabaseClient'
import { getUserByID } from '@/services/user'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Toast } from 'primereact/toast'
import { postBalance, putBalance } from '@/services/balance'

export default function Home() {
  const [date, setDate] = useState<Nullable<Date>>(null)
  const [idUser, setIdUser] = useState<any>()
  const [user, setUser] = useState<any>()
  const [visible, setVisible] = useState(false)
  const [newSaldo, setNewSaldo] = useState<any>('')
  const toast = useRef<any>(null)

  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Saldo atualizado',
      life: 3000,
    })
  }

  const showError = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: 'Erro ao atualizar saldo',
      life: 3000,
    })
  }

  useEffect(() => {
    async function checkAndInsertUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) setIdUser(user.id)

      if (!user) return

      // Verifica se já existe na tabela User
      const { data: existingUser, error } = await supabase
        .from('User')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Erro ao buscar usuário', error)
        return
      }

      if (!existingUser) {
        const { error: insertError } = await supabase.from('User').insert({
          id: user.id,
          name: user.user_metadata.full_name || 'Usuário Google',
        })

        if (insertError) {
          console.error('Erro ao inserir usuário', insertError)
        } else {
          console.log('Usuário inserido na tabela User')
          alert('Cadastro com sucesso!')
        }
      }
    }

    checkAndInsertUser()
  }, [])
  const getUser = async () => {
    if (idUser) {
      await getUserByID(idUser)
        .then((response) => setUser(response.data))
        .catch((error) => {
          console.error(error)
        })
    }
  }
  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idUser])

  const PutNewSaldo = async () => {
    if (user?.balance) {
      const Data = {
        id: user.balance.id,
        value: Number(newSaldo) + Number(user.balance.value),
      }
      await putBalance(Data)
        .then(() => {
          setVisible(false)
          showSuccess()
          getUser()
        })
        .catch((error) => {
          console.error(error)
          showError()
        })
    } else {
      const Data = {
        userId: user.id,
        value: parseFloat(newSaldo),
      }
      await postBalance(Data)
        .then(() => {
          setVisible(false)
          showSuccess()
          getUser()
        })
        .catch((error) => {
          console.error(error)
          showError()
        })
    }
  }

  function formatarDataNomeada(dataIso: any) {
    const data = new Date(dataIso)

    const dia = data.getDate().toString().padStart(2, '0')
    const meses = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ]
    const mesNomeado = meses[data.getMonth()]
    const ano = data.getFullYear()

    return `${dia} / ${mesNomeado} / ${ano}`
  }

  return (
    <>
      <Toast ref={toast} />
      <div className="card flex justify-content-center">
        <Dialog
          header="Adicionar Saldo"
          visible={visible}
          style={{ width: '20vw' }}
          onHide={() => setVisible(false)}
          closable={false}
          draggable={false}
          resizable={false}
          modal
        >
          <div className="py-2">
            <InputText
              value={newSaldo}
              type="number"
              className="bg-gray-300 w-full pl-3 py-1 border-round-3xl text-2xl "
              placeholder="Valor"
              onChange={(e) => setNewSaldo(e.target.value)}
            />
            <Button
              className="bg-purple-500 w-full hover:bg-purple-700 border-round-3xl py-2 text-white mt-3"
              type="button"
              label="Adicionar"
              onClick={() => PutNewSaldo()}
            />
            <Button
              className="text-red-500 w-full text-sm mt-3"
              type="button"
              label="Fechar"
              onClick={() => {
                setVisible(false)
              }}
            />
          </div>
        </Dialog>
      </div>

      <div className="w-full font-comfortaa bg-[##F0F0F0] pb-7 lg:pb-0 p-4 flex flex-col gap-4 xl:pt-6 xl:pb-0 xl:p-8">
        <ToolBar selectedDate={null} setSelectedDate={null} />
        <div className="flex flex-col xl:flex-row w-auto xl:gap-0 gap-4">
          <div className="w-full flex flex-col gap-4 ">
            <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-4 xl:gap-6">
              <div className=" p-4 bg-gray-50 text-black rounded-lg shadow-xl w-full xl:w-7">
                <DoughnutChartDemo />
              </div>
              <div className="flex flex-col items-center text-black w-12 md:w-4 bg-gray-50 rounded-xl shadow-xl gap-3 h-15rem justify-center">
                <p className="text-4xl font-bol font-poppins">Saldo</p>
                <p className="text-2xl text-[#1E195B] font-poppins">
                  R${user?.balance ? user?.balance?.value : '0,00'}
                </p>
                <p className="text-xs">
                  {user?.balance?.updatedAt &&
                    formatarDataNomeada(user?.balance?.updatedAt)}
                </p>
                <button
                  onClick={() => setVisible(true)}
                  className="flex items-center gap-1 bg-gray-200 p-1 px-3 rounded-lg text-sm"
                >
                  Novo saldo{' '}
                  <i>
                    <FiPlusCircle />
                  </i>
                </button>
              </div>
            </div>
            <div className="xl:pr-5 ">
              <DespesasList />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="shadow-xl text-black bg-gray-50 p-4 rounded-xl">
              <p className="mb-5">Calendário</p>
              <div className="card flex flex-col  justify-content-center ">
                <Calendar
                  value={date}
                  onChange={(e) => setDate(e.value)}
                  inline
                  className="text-xs"
                />
              </div>
            </div>
            <div>
              <GoalsList />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
