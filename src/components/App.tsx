import React from 'react'
import Spinner from './Spinner/Spinner'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { fetchData } from '../store/models/card/actions'

/** Application main component. */
const App: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch()

  React.useEffect(() => {
    dispatch(fetchData())
  }, [])

  return <Spinner />
}

export default App
