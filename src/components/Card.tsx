import React from 'react'
import { ICard } from '../store/models/card/types'

type CardProps = {
  card: ICard
}

const Card: React.FC<CardProps> = ({ card }) => {
  console.log(card)
  return <h1>2</h1>
}

export default Card
