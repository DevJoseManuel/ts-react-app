import React from 'react'
import styles from './card.module.css'
import { ICard } from '../../store/models/card/types'

type CardProps = {
  card: ICard
}

const Card: React.FC<CardProps> = ({ card }) => {
  console.log(card)
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img src={card.imageUrl} alt={`Picture of ${card.name}`} />
      </div>
      <div className={styles.cardName}>{card.name}</div>
      <div className={styles.cardCount}>{card.count.total}</div>
    </div>
  )
}

export default Card
