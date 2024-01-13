import { useSelector } from 'react-redux'

import Contatos from '../../components/Contatos'
import { MainContainer, Nome } from '../../styles/index'

import { RootReducer } from '../../store'

const ListaDeContatos = () => {
  const { itens } = useSelector((state: RootReducer) => state.contatos)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )

  const filtraContato = () => {
    let contatosFiltrados = itens
    if (termo !== undefined) {
      contatosFiltrados = contatosFiltrados.filter(
        (item) =>
          item.nome.toLowerCase().search(termo.toLowerCase()) >= 0 ||
          item.informacao.search(termo) >= 0
      )
      if (criterio === 'prioridade') {
        contatosFiltrados = contatosFiltrados.filter(
          (item) => item.prioridade === valor
        )
      }
      return contatosFiltrados
    } else {
      return itens
    }
  }

  const exibeResultadoFiltragem = (quantidade: number) => {
    let mensagem = ''

    const complementacao =
      termo !== undefined && termo.length > 0 ? `e  "${termo}"` : ''

    if (criterio === 'todos') {
      mensagem = `${quantidade} contato(s) encontrados como: todos ${complementacao}`
    } else {
      mensagem = `${quantidade} contato(s) encontrados como: "${`${criterio}=${valor}`}" ${complementacao}`
    }

    return mensagem
  }

  const contatos = filtraContato()
  const mensagem = exibeResultadoFiltragem(contatos.length)

  return (
    <MainContainer>
      <Nome as="p">{mensagem}</Nome>
      <ul>
        {contatos.map((c) => (
          <li key={c.nome}>
            <Contatos
              id={c.id}
              nome={c.nome}
              informacao={c.informacao}
              email={c.email}
              prioridade={c.prioridade}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ListaDeContatos
