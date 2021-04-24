import React from 'react'
import CardRow from '../Card/CardRow'
import DeckTableAlert from './DeckTableAlert'
import { useSelector } from 'react-redux'
import { Store } from '../../store/redux'
import { CardState } from '../../store/models/card/types'

type DeckTableBodyProps = {
  rows: string[]
}

const DeckTableBody: React.FC<DeckTableBodyProps> = props => {
  const { model } = useSelector<Store, CardState>(state => state.cards)

  return (
    <>
      <DeckTableAlert />
      {props.rows.map(_id => (
        <CardRow key={_id} card={model.entities.card[_id]} />
      ))}
    </>
  )
}

export default DeckTableBody
