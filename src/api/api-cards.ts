import { mock } from './mock-data'
import { ICard } from '../store/models/card/types'

export const apiFetchCards = (): Promise<ICard[]> => {
  const promise = new Promise<ICard[]>(resolve => {
    setTimeout(() => {
      resolve(mock)
    }, 1000)
  })
  return promise
}
