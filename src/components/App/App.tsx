import React from 'react'
import Welcome from '../Welcome/Welcome'
import Deck from '../Deck/Deck'
import useIsMounted from '../../hooks/useIsMounted'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { fetchData } from '../../store/models/card/actions'
import { CardReduxEvent } from '../../store/models/card/types'

/** Application main component. */
const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const isMounted = useIsMounted()
  const dispatch: Dispatch<CardReduxEvent> = useDispatch()

  React.useEffect(() => {
    if (isMounted()) {
      dispatch(fetchData())
      setIsLoaded(true)
    }
  }, [isMounted, dispatch])

  return isLoaded ? <Deck /> : <Welcome />
}

export default App
