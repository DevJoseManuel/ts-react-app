import React from 'react'
import styles from './card-row.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { ICard } from '../../store/models/card/types'
import { CardReduxEvent } from '../../store/models/card/types'
import { callEvent } from '../../store/models/events/actions'
import { Store } from '../../store/redux'
import { UserState } from '../../store/models/user/types'
import { EventActionTypes } from '../../store/models/events/types'

type CardRowProps = {
  card: ICard
}

const CardRow: React.FC<CardRowProps> = ({ card }) => {
  const { model } = useSelector<Store, UserState>(state => state.user)
  const dispatch: Dispatch<CardReduxEvent> = useDispatch()

  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img
          src={card.imageUrl}
          alt={`Picture of ${card.name}`}
          data-testid='card-image'
        />
      </div>
      <div className={styles.cardData}>
        <div className={styles.cardName} data-testid='card-name'>
          {card.name}
        </div>
        <div className={styles.cardActions}>
          <button
            onClick={() =>
              dispatch(
                callEvent(EventActionTypes.VIEW_CARD, {
                  userId: model.userId,
                  cardId: card._id,
                  totalCards: card.count.total,
                  timestamp: new Date().getTime()
                })
              )
            }
          >
            Edit
          </button>
          &middot;
          <button
            onClick={() =>
              dispatch(
                callEvent(EventActionTypes.DELETE_CARD, {
                  userId: model.userId,
                  cardId: card._id,
                  totalCards: card.count.total,
                  timestamp: new Date().getTime()
                })
              )
            }
          >
            Delete
          </button>
        </div>
        <div className={styles.cardCount} data-testid='card-total'>
          {card.count.total}
        </div>
      </div>
    </div>
  )
}

export default CardRow
