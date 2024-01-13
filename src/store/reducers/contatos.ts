import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Contato from '../../models/Tarefa'
import * as enums from '../../utils/enums/Contato'

type ContatoState = {
  itens: Contato[]
}

const initialState: ContatoState = {
  itens: [
    {
      nome: 'Danilo',
      prioridade: enums.Prioridade.AMIGO,
      informacao: '(21) 99999-9999',
      email: 'daniloteste@teste.com',
      id: 1
    },
    {
      nome: 'Giovanna',
      prioridade: enums.Prioridade.FAMILIAR,
      informacao: '(21) 99999-9999',
      email: 'giovannateste@teste.com',
      id: 2
    },
    {
      nome: 'Elaine',
      prioridade: enums.Prioridade.FAMILIAR,
      informacao: '(21) 99999-9999',
      email: 'elaineteste@teste.com',
      id: 3
    },
    {
      nome: 'Casas Pedro',
      prioridade: enums.Prioridade.OUTROS,
      informacao: '(21) 99999-9999',
      email: 'casaspedroteste@teste.com',
      id: 4
    },
    {
      nome: 'Diogo',
      prioridade: enums.Prioridade.AMIGO,
      informacao: '(21) 99999-9999',
      email: 'diogoteste@teste.com',
      id: 5
    }
  ]
}

const contatosSlice = createSlice({
  name: 'contatos',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = [
        ...state.itens.filter((contato) => contato.id !== action.payload)
      ]
    },
    editar: (state, action: PayloadAction<Contato>) => {
      const indexDoContato = state.itens.findIndex(
        (c) => c.id === action.payload.id
      )

      if (indexDoContato >= 0) {
        state.itens[indexDoContato] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Contato>) => {
      const numeroJaExiste = state.itens.find(
        (contato) =>
          contato.informacao.toLowerCase() ===
          action.payload.informacao.toLowerCase()
      )
      const emailJaExistente = state.itens.find(
        (contato) =>
          contato.email.toLowerCase() === action.payload.email.toLowerCase()
      )
      if (numeroJaExiste) {
        alert('Já existe um contato com este número')
      }
      if (emailJaExistente) {
        alert('Já existe um contato com este e-mail')
      } else {
        state.itens.push(action.payload)
      }
    }
  }
})

export const { remover, editar, cadastrar } = contatosSlice.actions

export default contatosSlice.reducer
