import React from 'react'
import Card from './Card'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { fetchData } from '../store/models/card/actions'

/** Application main component. */
const App: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch()

  React.useEffect(() => {
    dispatch(fetchData())
  }, [])

  console.log('como que no ha cambiado nada....')

  return (
    <Card
      card={{
        _id: '5ce27b5b89230f002e13f606',
        name: 'Duo',
        imageUrl:
          'https://static.streamloots.com/e19c7bf6-ca3e-49a8-807e-b2e9a1a47524/703ea030-8527-4a17-bd6f-23763eabfec9.png',
        count: { total: 0 }
      }}
    />
  )
}

export default App
