import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { BotaoSalvar, MainContainer, Nome } from '../../styles/index'
import { Campo } from '../../styles/index'
import { Form, Opcoes, Opcao } from './styles'
import * as enums from '../../utils/enums/Contato'
import Contato from '../../models/Tarefa'
import { Informacao } from '../../components/Contatos/styles'
import { cadastrar } from '../../store/reducers/contatos'

const Formulario = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [informacao, setInformacao] = useState('')
  const [email, setEmail] = useState('')
  const [prioridade, setPrioridade] = useState(enums.Prioridade.OUTROS)

  const cadastrarContato = (evento: FormEvent) => {
    evento.preventDefault()
    const contatoParaAdicionar = new Contato(
      nome,
      prioridade,
      informacao,
      email,
      9
    )

    dispatch(cadastrar(contatoParaAdicionar))
    navigate('/')
  }

  return (
    <MainContainer>
      <Nome>Novo Contato</Nome>
      <Form onSubmit={cadastrarContato}>
        <Campo
          value={nome}
          onChange={(evento) => setNome(evento.target.value)}
          type="text"
          as="textarea"
          placeholder="Nome"
        />
        <Campo
          value={informacao}
          onChange={(evento) => setInformacao(evento.target.value)}
          as="textarea"
          placeholder="(xx) xxxxx-xxxx"
        />
        <Campo
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
          type="text"
          as="textarea"
          placeholder="E-mail"
        />

        <Opcoes>
          <p>Prioridade</p>

          {Object.values(enums.Prioridade).map((prioridade) => (
            <Opcao key={prioridade}>
              <input
                value={prioridade}
                name="prioridade"
                type="radio"
                onChange={(evento) =>
                  setPrioridade(evento.target.value as enums.Prioridade)
                }
                id={prioridade}
                defaultChecked={prioridade === enums.Prioridade.OUTROS}
              />
              <label htmlFor={prioridade}>{prioridade}</label>
            </Opcao>
          ))}
        </Opcoes>
        <BotaoSalvar type="submit">Cadastrar</BotaoSalvar>
      </Form>
    </MainContainer>
  )
}

export default Formulario
