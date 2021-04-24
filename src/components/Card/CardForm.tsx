import React from 'react'
import styles from './card-form.module.css'
import { ICard } from '../../store/models/card/types'
import { Dispatch } from 'redux'
import { CardReduxEvent } from '../../store/models/card/types'
import { useDispatch } from 'react-redux'
import { clearCardId, editCard } from '../../store/models/card/actions'

type CardFormProps = {
  card: ICard
}

const CardForm: React.FC<CardFormProps> = ({ card }) => {
  const [name, setName] = React.useState(card.name)
  const [img, setImg] = React.useState(card.imageUrl)
  const dispatch: Dispatch<CardReduxEvent> = useDispatch()

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        dispatch(editCard(card._id, name, img))
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
  )
}

export default CardForm
