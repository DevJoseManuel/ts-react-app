import React from 'react'
import styles from './card-row.module.css'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { ICard } from '../../store/models/card/types'
import { deleteCard, setCardId } from '../../store/models/card/actions'
import { CardReduxEvent } from '../../store/models/card/types'

type CardRowProps = {
  card: ICard
}

const CardRow: React.FC<CardRowProps> = ({ card }) => {
  const dispatch: Dispatch<CardReduxEvent> = useDispatch()

  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img src={card.imageUrl} alt={`Picture of ${card.name}`} />
      </div>
      <div className={styles.cardName}>
        <button onClick={() => dispatch(setCardId(card._id))}>
          {card.name}
        </button>
      </div>
      <div className={styles.cardActions}>
        <button onClick={() => dispatch(setCardId(card._id))}>Edit</button> |{' '}
        <button onClick={() => dispatch(deleteCard(card._id))}>Delete</button>
      </div>
      <div className={styles.cardCount}>{card.count.total}</div>
    </div>
  )
}

export default CardRow
