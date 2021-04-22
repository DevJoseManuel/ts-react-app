import { ICard, CardActionTypes } from './types'

export const fetchData = (): { type: string } => ({
  type: CardActionTypes.FETCH_DATA
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

export const setLoading = (
  isLoading: boolean
): { type: string; payload: { isLoading: boolean } } => ({
  type: CardActionTypes.SET_LOADING,
  payload: { isLoading }
})
