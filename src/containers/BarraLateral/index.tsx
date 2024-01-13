import { useDispatch, useSelector } from 'react-redux'
import FiltroCard from '../../components/FiltroCard'
import * as S from './styles'
import { RootReducer } from '../../store'
import { alteraTermo } from '../../store/reducers/filtro'
import * as enums from '../../utils/enums/Contato'
import { Campo } from '../../styles/index'

const BarraLateral = () => {
  const dispatch = useDispatch()
  const { termo } = useSelector((state: RootReducer) => state.filtro)

  return (
    <S.Aside>
      <div>
        <Campo
          type="text"
          placeholder="Buscar"
          value={termo}
          onChange={(evento) => dispatch(alteraTermo(evento.target.value))}
        />
        <S.Filtros>
          <FiltroCard
            valor={enums.Prioridade.AMIGO}
            criterio="prioridade"
            legenda="amigos"
          />
          <FiltroCard
            valor={enums.Prioridade.FAMILIAR}
            criterio="prioridade"
            legenda="familiares"
          />
          <FiltroCard
            valor={enums.Prioridade.OUTROS}
            criterio="prioridade"
            legenda="outros"
          />
          <FiltroCard criterio="todos" legenda="todos" />
        </S.Filtros>
      </div>
    </S.Aside>
  )
}

export default BarraLateral
