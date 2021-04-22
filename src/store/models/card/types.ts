/** Defines the specified domain data. */
export interface ICard {
  _id: string
  name: string
  imageUrl: string
  count: {
    total: number
  }
}

/** Defines the action types. */
export enum CardActionTypes {
  FETCH_DATA = 'card/FETCH_DATA',
  SET_CARDS = 'card/SET_CARDS',
  SET_ERROR = 'card/SET_ERROR',
  SET_LOADING = 'card/SET_LOADING'
}

export interface CardModel {
  entities: {
    card: { [_id: string]: ICard }
  }
  result: string[]
}

export interface CardUI {
  loading: boolean
  error?: string
}

/** Handles the type of domain state. */
export interface CardState {
  readonly model: CardModel
  readonly ui: CardUI
}
