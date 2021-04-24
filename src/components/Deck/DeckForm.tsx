import _ from 'lodash'
import React from 'react'
import CardForm from '../Card/CardForm'
import styles from './deck-form.module.css'
import { useSelector } from 'react-redux'
import { CardState } from '../../store/models/card/types'
import { Store } from '../../store/redux'

const DeckForm: React.FC = () => {
  const { model, ui } = useSelector<Store, CardState>(state => state.cards)
  const index = _.isUndefined(ui.cardId) ? '' : ui.cardId

  return (
    <div className={styles.deckform}>
      <h2>Card Details</h2>
      <CardForm card={model.entities.card[index]} />
    </div>
  )
}

export default DeckForm
