import React from 'react'
import Spinner from '../Spinner/Spinner'
import styles from './deck.module.css'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '../../store/redux'
import { CardReduxModel, CardReduxEvent } from '../../store/models/card/types'
import Card from '../Card/Card'

const Deck: React.FC = () => {
  const dispatch: Dispatch<CardReduxEvent> = useDispatch()
  const isLoading = useSelector<Store, boolean>(state => state.cards.ui.loading)
  const redux = useSelector<Store, CardReduxModel>(state => state.cards.model)

  console.log(redux.result.map(_id => redux.entities.card[_id]))

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Card List</div>
      <div className={styles.filter}>Autocomplete</div>
      {isLoading ? (
        <Spinner />
      ) : (
        redux.result.map(_id => (
          <Card key={_id} card={redux.entities.card[_id]} />
        ))
      )}
    </div>
  )
}

export default Deck
