import { ICard, CardActionTypes } from './types'

export const clearAlert = (): { type: string } => ({
  type: CardActionTypes.CLEAR_ALERT
})

export const clearCardId = (): { type: string } => ({
  type: CardActionTypes.CLEAR_CARD_ID
})

export const clearFilter = (): { type: string } => ({
  type: CardActionTypes.CLEAR_FILTER
})

export const deleteCard = (
  cardId: string
): { type: string; payload: { cardId: string } } => ({
  type: CardActionTypes.DELETE_CARD,
  payload: { cardId }
})

export const editCard = (
  _id: string,
  name: string,
  imageUrl: string
): {
  type: string
  payload: { cardId: string; name: string; imageUrl: string }
} => ({
  type: CardActionTypes.EDIT_CARD,
  payload: { cardId: _id, name, imageUrl }
})

export const fetchData = (): { type: string } => ({
  type: CardActionTypes.FETCH_DATA
})

export const setCardId = (
  cardId: string
): { type: string; payload: { cardId: string } } => ({
  type: CardActionTypes.SET_CARD_ID,
  payload: { cardId }
})

export const setCards = (
  cards: ICard[]
): { type: string; payload: { cards: ICard[] } } => ({
  type: CardActionTypes.SET_CARDS,
  payload: { cards }
})

export const setError = (
  error: string
): { type: string; payload: { error: string } } => ({
  type: CardActionTypes.SET_ERROR,
  payload: { error }
})

export const setFilter = (
  filter: string
): { type: string; payload: { filter: string } } => ({
  type: CardActionTypes.SET_FILTER,
  payload: { filter }
})

export const setLoading = (
  isLoading: boolean
): { type: string; payload: { isLoading: boolean } } => ({
  type: CardActionTypes.SET_LOADING,
  payload: { isLoading }
})
