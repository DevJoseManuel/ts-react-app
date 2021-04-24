import React from 'react'
import Welcome from '../Welcome/Welcome'
import Deck from '../Deck/Deck'
import useIsMounted from '../../hooks/useIsMounted'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { Store } from '../../store/redux'
import { fetchData } from '../../store/models/card/actions'
import { CardState, CardReduxEvent } from '../../store/models/card/types'
import { setUser } from '../../store/models/user/actions'
import '../../assets/css/core.css'

/** Application main component. */
const App: React.FC = () => {
  const isMounted = useIsMounted()
  const dispatch: Dispatch<CardReduxEvent> = useDispatch()
  const { ui } = useSelector<Store, CardState>(state => state.cards)

  React.useEffect(() => {
    dispatch(setUser('user-1'))
  })

  React.useEffect(() => {
    if (isMounted()) {
      dispatch(fetchData())
    }
  }, [isMounted, dispatch])

  return <>{ui.loading ? <Welcome /> : <Deck />}</>
}

export default App
