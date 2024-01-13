import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'

import { remover, editar } from '../../store/reducers/contatos'
import Contato from '../../models/Tarefa'
import { BotaoSalvar } from '../../styles'

type Props = Contato

const Contatos = ({
  informacao: informacaoOriginal,
  nome,
  prioridade,
  email: emailOriginal,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [informacao, setInformacao] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (informacaoOriginal.length > 0) {
      setInformacao(informacaoOriginal)
    }
  }, [informacaoOriginal])

  useEffect(() => {
    if (emailOriginal.length > 0) {
      setEmail(emailOriginal)
    }
  }, [emailOriginal])

  function cancelarEdicao() {
    setEstaEditando(false)
    setInformacao(informacaoOriginal)
    setEmail(emailOriginal)
  }

  return (
    <S.Card>
      <S.Nome>{nome}</S.Nome>
      <S.Tag prioridade={prioridade}>{prioridade}</S.Tag>
      <S.Informacao
        disabled={!estaEditando}
        value={informacao}
        onChange={(evento) => setInformacao(evento.target.value)}
      />
      <S.Informacao
        disabled={!estaEditando}
        value={email}
        onChange={(evento) => setEmail(evento.target.value)}
      />
      <S.BarraAcoes>
        {estaEditando ? (
          <>
            <BotaoSalvar
              onClick={() => {
                dispatch(
                  editar({
                    informacao: informacaoOriginal,
                    nome,
                    prioridade,
                    email: emailOriginal,
                    id
                  })
                )
                setEstaEditando(false)
              }}
            >
              Salvar
            </BotaoSalvar>
            <S.BotaoCancelarRemover onClick={cancelarEdicao}>
              Cancelar
            </S.BotaoCancelarRemover>
          </>
        ) : (
          <>
            <S.Botao onClick={() => setEstaEditando(true)}>Editar</S.Botao>
            <S.BotaoCancelarRemover onClick={() => dispatch(remover(id))}>
              Excluir
            </S.BotaoCancelarRemover>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Contatos
