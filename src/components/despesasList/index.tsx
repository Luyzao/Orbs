import React, { useEffect, useState, useCallback, useRef } from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { Checkbox } from 'primereact/checkbox'
import { postExpense, getExpensesByUserId } from '@/services/expense'
import { getCategory } from '@/services/category'
import { supabase } from 'lib/supabaseClient'
import { Toast } from 'primereact/toast'

type ExpenseItem = {
  id: string
  title: string
  amount: number
  date: string
  categoryName: string
  categoryColor: string
}

type Props = {
  onSuccess?: () => void
  selectedDate: Date | null
}

export default function DespesasList({ onSuccess, selectedDate }: Props) {
  const [visibleExpenses, setVisibleExpenses] = useState(false)
  const [titulo, setTitulo] = useState('')
  const [valor, setValor] = useState('')
  const [categoria, setCategoria] = useState<string | null>(null)
  const [data, setData] = useState<Date | any>(null)
  const [credito, setCredito] = useState(false)
  const [qtdParcelas, setQtdParcelas] = useState<number | any>('')
  const [parcelaAtual, setParcelaAtual] = useState<number | null>(null)
  const [category, setCategory] = useState<any[]>([])
  const [idUser, setIdUser] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [expenses, setExpenses] = useState<any[]>([])
  const [searchText, setSearchText] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState<string | null>(null)
  const toast = useRef<any>(null)

  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Despesa criada',
      life: 3000,
    })
  }

  const showError = () => {
    toast.current.show({
      severity: 'error',
      summary: 'Error',
      detail: 'Erro na criação de despesa',
      life: 3000,
    })
  }
  // Resetar formulário
  const resetForm = () => {
    setTitulo('')
    setValor('')
    setData(null)
    setQtdParcelas('')
    setParcelaAtual(null)
    setCategoria(null)
    setCredito(false)
  }

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true)
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      setIdUser(user.id)

      const allExpenses = await getExpensesByUserId(user.id)
      if (!allExpenses || !allExpenses.data) return

      // Se tiver data selecionada, filtra até esse dia
      const filtered = selectedDate
        ? allExpenses.data.filter(
            (item: any) => new Date(item.date) <= selectedDate,
          )
        : allExpenses.data

      setExpenses(filtered)
      setLoading(false)
    }

    fetchExpenses()
  }, [selectedDate])

  // Buscar usuário e categorias
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setIdUser(user.id)
        // Buscar despesas desse usuário
        await fetchExpenses(user.id)
      }

      try {
        const res = await getCategory()
        setCategory(res.data)
      } catch (err) {
        console.error('Erro ao buscar categorias:', err)
      }
    }
    fetchData()
  }, [])

  // Buscar despesas por usuário
  const fetchExpenses = async (userId: string) => {
    try {
      const res = await getExpensesByUserId(userId)
      // Assumindo que a API retorna despesas com propriedades que você precisa:
      setExpenses(res.data)
    } catch (err) {
      console.error('Erro ao buscar despesas:', err)
    }
  }

  // Gerar opções para parcela atual
  const parcelas = Array.from({ length: Number(qtdParcelas) || 1 }, (_, i) => ({
    label: `${i + 1}`,
    value: i + 1,
  }))

  // Adicionar despesa
  const postExpenses = useCallback(async () => {
    if (!titulo || !valor || !categoria || !data) {
      alert('Preencha todos os campos obrigatórios!')
      return
    }
    if (credito && (!qtdParcelas || !parcelaAtual)) {
      alert('Preencha o parcelamento corretamente!')
      return
    }

    const Data = {
      title: titulo,
      amount: Number(valor),
      date: data.toISOString(),
      isCredit: credito,
      totalInstallments: credito ? Number(qtdParcelas) : null,
      currentInstallment: credito ? parcelaAtual : null,
      categoryId: categoria,
      userId: idUser,
    }

    try {
      setLoading(true)
      await postExpense(Data)
        .then(() => {
          if (onSuccess) onSuccess()
          showSuccess()
        })
        .catch(() => {
          showError()
        })
      setVisibleExpenses(false)
      resetForm()
      if (idUser) await fetchExpenses(idUser) // atualizar lista
    } catch (error) {
      console.error('Erro ao salvar despesa:', error)
      alert('Erro ao salvar despesa.')
    } finally {
      setLoading(false)
    }
  }, [
    titulo,
    valor,
    categoria,
    data,
    credito,
    qtdParcelas,
    parcelaAtual,
    idUser,
    onSuccess,
  ])

  // Filtrar despesas por texto
  const despesasFiltradas = expenses.filter((item) => {
    const correspondeBusca = item.title
      .toLowerCase()
      .includes(searchText.toLowerCase())
    const correspondeCategoria = categoriaFiltro
      ? item.category?.id === categoriaFiltro
      : true
    return correspondeBusca && correspondeCategoria
  })

  // Agrupar despesas por data (string formatada)
  const despesasAgrupadas = despesasFiltradas.reduce<
    Record<string, ExpenseItem[]>
  >((acc, curr) => {
    const dataFormatada = new Date(curr.date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })

    const itemFormatado: ExpenseItem = {
      id: curr.id,
      title: curr.title,
      amount: curr.amount,
      date: curr.date,
      categoryName: curr.category?.name || 'Sem categoria',
      categoryColor: curr.category?.color || '#ccc',
    }

    if (!acc[dataFormatada]) acc[dataFormatada] = []
    acc[dataFormatada].push(itemFormatado)
    return acc
  }, {})

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Nova despesa"
        visible={visibleExpenses}
        style={{ width: '30vw' }}
        onHide={() => {
          setVisibleExpenses(false)
          resetForm()
        }}
        draggable={false}
        resizable={false}
        modal
      >
        <div className="flex flex-col gap-4 border-top-2 pt-3">
          {/* Título e Valor */}
          <div className="flex gap-4">
            <div className="flex flex-col flex-1 w-full">
              <label className="font-semibold mb-1">Título despesa</label>
              <InputText
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Título despesa"
                className="bg-gray-200 h-3rem p-2 border-round-xl"
              />
            </div>
            <div className="flex flex-col w-4">
              <label className="font-semibold mb-1">Valor</label>
              <InputText
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="R$ 00,00"
                className="bg-gray-200 h-3rem p-2 border-round-xl"
                type="number"
                min={0}
                step="0.01"
              />
            </div>
          </div>

          {/* Categoria e Data */}
          <div className="flex gap-4">
            <Dropdown
              value={categoria}
              onChange={(e) => setCategoria(e.value)}
              options={category}
              optionLabel="name"
              optionValue="id"
              placeholder="Categoria"
              className="bg-gray-200 w-12 border-round-2xl"
            />
            <Calendar
              value={data}
              onChange={(e) => setData(e.value)}
              placeholder="Data"
              className="shadow-1 w-9 border-round-2xl pl-2"
              showIcon
            />
          </div>

          {/* Crédito */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Compra no crédito?</label>
            <div className="flex items-center gap-3">
              <Checkbox
                inputId="credito"
                checked={credito}
                onChange={(e) => setCredito(e.checked || false)}
                className="rounded-xl justify-center items-center w-2rem h-2rem bg-purple-400"
              />
              <label htmlFor="credito">{credito ? 'Sim' : 'Não'}</label>
            </div>
          </div>

          {/* Parcelamento */}
          {credito && (
            <div className="flex gap-5">
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Qtd de parcelas</label>
                <InputText
                  type="number"
                  value={qtdParcelas}
                  onChange={(e) =>
                    setQtdParcelas(
                      e.target.value === '' ? '' : Number(e.target.value),
                    )
                  }
                  placeholder="Qtd de parcelas"
                  className="bg-gray-200 p-3 h-3rem border-round-xl"
                  min={1}
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Parcela atual</label>
                <Dropdown
                  value={parcelaAtual}
                  onChange={(e) => setParcelaAtual(e.value)}
                  options={parcelas}
                  placeholder="Parcela atual"
                  className="bg-gray-200 w-7rem border-round-xl"
                />
              </div>
            </div>
          )}

          <Button
            label={loading ? 'Salvando...' : 'Salvar'}
            onClick={postExpenses}
            disabled={loading}
            className="bg-indigo-700 py-2 border-none text-white"
          />
        </div>
      </Dialog>

      {/* LISTAGEM DE DESPESAS */}
      <div className="bg-gray-50 px-4 md:px-6 pt-5 text-black rounded-xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Despesas</h2>
          <button
            onClick={() => setVisibleExpenses(true)}
            className="bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700"
          >
            <FiPlusCircle className="text-xl" />
          </button>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Buscar despesas"
            className="bg-gray-200 text-xs border-0 px-3 rounded-lg "
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.value)}
            options={[{ id: null, name: 'Todas as categorias' }, ...category]}
            optionLabel="name"
            optionValue="id"
            placeholder="Categoria"
            className="bg-gray-200 text-xs w-60 border-round-xl"
          />
        </div>

        {/* Lista de Despesas agrupada */}
        <div className="md:h-[370px] h-[220px] overflow-y-auto">
          {Object.entries(despesasAgrupadas).map(([data, despesas]) => (
            <div key={data}>
              <h3 className="font-bold text-lg mt-4">{data}</h3>
              {despesas.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-2 px-3 my-2 rounded-lg w-full flex justify-between items-center shadow-sm"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-end gap-2">
                      <span
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: item.categoryColor,
                          color: '#fff',
                          marginTop: '4px',
                        }}
                      >
                        {item.categoryName}
                      </span>
                      <p className="font-semibold">{item.title}</p>
                    </div>
                    <p className="text-sm text-gray-600">
                      R$ {item.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {despesasFiltradas.length === 0 && (
            <p className="text-center text-gray-500 mt-8">Nenhuma despesa.</p>
          )}
        </div>
      </div>
    </>
  )
}
