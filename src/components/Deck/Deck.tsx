import _ from 'lodash'
import React from 'react'
import Spinner from '../Spinner/Spinner'
import styles from './deck.module.css'
import DeckTable from './DeckTable'
import DeckForm from './DeckForm'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from '../../store/redux'
import { CardReduxEvent, CardReduxUI } from '../../store/models/card/types'

const Deck: React.FC = () => {
  const dispatch: Dispatch<CardReduxEvent> = useDispatch()

  const ui = useSelector<Store, CardReduxUI>(state => state.cards.ui)

  return (
    <div className={styles.wrapper}>
      {ui.loading ? (
        <Spinner />
      ) : _.isEmpty(ui.cardId) ? (
        <DeckTable />
      ) : (
        <DeckForm />
      )}
    </div>
  )
}

export default Deck
