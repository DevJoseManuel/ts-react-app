import _ from 'lodash'
import React from 'react'
import CardForm from '../Card/CardForm'
import styles from './deck.module.css'
import { useSelector } from 'react-redux'
import { CardReduxModel, CardReduxUI } from '../../store/models/card/types'
import { Store } from '../../store/redux'

const DeckForm: React.FC = () => {
  const model = useSelector<Store, CardReduxModel>(state => state.cards.model)
  const ui = useSelector<Store, CardReduxUI>(state => state.cards.ui)
  const index = _.isUndefined(ui.cardId) ? '' : ui.cardId

  return (
    <>
      <div className={styles.title}>Card Details</div>
      <CardForm card={model.entities.card[index]} />
    </>
  )
}

export default DeckForm
