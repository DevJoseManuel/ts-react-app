import { UserActionTypes } from './types'

export const setUser = (
  userId: string
): { type: string; payload: { userId: string } } => ({
  type: UserActionTypes.SET_USER,
  payload: { userId }
})

export const setTotalCards = (
  totalCards: number
): { type: string; payload: { totalCards: number } } => ({
  type: UserActionTypes.SET_TOTAL_CARDS,
  payload: { totalCards }
})

export const subtractTotalCards = (
  totalCards: number
): { type: string; payload: { totalCards: number } } => ({
  type: UserActionTypes.SUBTRACT_TOTAL_CARDS,
  payload: { totalCards }
})
