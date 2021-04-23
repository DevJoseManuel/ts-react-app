import React from 'react'
import CardRow from '../Card/CardRow'
import styles from './deck.module.css'
import Autocomplete from 'react-autocomplete'
import { useSelector } from 'react-redux'
import { CardReduxModel } from '../../store/models/card/types'
import { Store } from '../../store/redux'

const DeckTable: React.FC = () => {
  const redux = useSelector<Store, CardReduxModel>(state => state.cards.model)

  return (
    <>
      <div className={styles.title}>Card List</div>
      <div className={styles.filter}>
        <Autocomplete />
      </div>
      {redux.result.map(_id => (
        <CardRow key={_id} card={redux.entities.card[_id]} />
      ))}
    </>
  )
}

export default DeckTable
