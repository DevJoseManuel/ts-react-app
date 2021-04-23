import React from 'react'
import Spinner from '../Spinner/Spinner'
import Welcome from '../Welcome/Welcome'
import useIsMounted from '../../hooks/useIsMounted'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { fetchData } from '../../store/models/card/actions'
import { Store } from '../../store/redux'
import { CardReduxModel, CardReduxEvent } from '../../store/models/card/types'

/** Application main component. */
const App: React.FC = () => {
  const isMounted = useIsMounted()
  const isLoading = useSelector<Store, boolean>(state => state.cards.ui.loading)
  const cards = useSelector<Store, CardReduxModel>(state => state.cards.model)
  const dispatch: Dispatch<CardReduxEvent> = useDispatch()

  React.useEffect(() => {
    if (isMounted()) {
      dispatch(fetchData())
    }
  }, [isMounted])

  return <Welcome />
}

export default App
