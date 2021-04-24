import React from 'react'
import styles from './card-form.module.css'
import { ICard } from '../../store/models/card/types'
import { Dispatch } from 'redux'
import { CardReduxEvent } from '../../store/models/card/types'
import { useDispatch, useSelector } from 'react-redux'
import { clearCardId } from '../../store/models/card/actions'
import { callEvent } from '../../store/models/events/actions'
import { EventActionTypes } from '../../store/models/events/types'
import { Store } from '../../store/redux'
import { UserState } from '../../store/models/user/types'

type CardFormProps = {
  card: ICard
}

const CardForm: React.FC<CardFormProps> = ({ card }) => {
  const [name, setName] = React.useState(card.name)
  const [img, setImg] = React.useState(card.imageUrl)
  const { model } = useSelector<Store, UserState>(state => state.user)
  const dispatch: Dispatch<CardReduxEvent> = useDispatch()

  return (
    <>
      <h2>{card.name}</h2>
      <form
        onSubmit={e => {
          e.preventDefault()
          dispatch(
            callEvent(EventActionTypes.EDIT_CARD, {
              userId: model.userId,
              cardId: card._id,
              totalCards: card.count.total,
              timestamp: new Date().getTime(),
              meta: { name, img }
            })
          )
        }}
      >
        <div className={styles.formImage}>
          <img src={card.imageUrl} alt={`Picture of ${card.name}`} />
        </div>
        <div>
          <label className={styles.formLabel} htmlFor='cardName'>
            Card name:
          </label>
          <input
            className={styles.formInput}
            type='text'
            id='cardName'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label className={styles.formLabel} htmlFor='cardImage'>
            Image url:
          </label>
          <input
            className={styles.formInput}
            type='text'
            id='cardImage'
            value={img}
            onChange={e => setImg(e.target.value)}
          />
        </div>
        <div>
          <button className={`primary ${styles.formSubmit}`} type='submit'>
            Edit Card
          </button>
        </div>
        <div className={styles.formBack}>
          <button className='link' onClick={() => dispatch(clearCardId())}>
            Back
          </button>
        </div>
      </form>
    </>
  )
}

export default CardForm
