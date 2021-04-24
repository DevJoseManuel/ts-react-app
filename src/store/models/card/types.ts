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
  CLEAR_ALERT = 'card/CLEAR_ALERT',
  CLEAR_FILTER = 'card/CLEAR_FILTER',
  CLEAR_CARD_ID = 'card/CLEAR_CARD_ID',
  DELETE_CARD = 'card/DELETE_CARD',
  EDIT_CARD = 'card/EDIT_CARD',
  FETCH_DATA = 'card/FETCH_DATA',
  SET_CARD_ID = 'card/SET_CARD',
  SET_CARDS = 'card/SET_CARDS',
  SET_ERROR = 'card/SET_ERROR',
  SET_FILTER = 'card/SET_FILTER',
  SET_LOADING = 'card/SET_LOADING'
}

export interface CardReduxModel {
  entities: {
    card: { [_id: string]: ICard }
  }
  result: string[]
}

export interface CardReduxUI {
  loading: boolean
  cardId?: string
  error?: string
  message?: string
  filter?: {
    text: string
    results: string[]
  }
}

export type CardReduxEvent =
  | { type: string }
  | { type: string; payload: { _id: string; name: string; imageUrl: string } }
  | { type: string; payload: { cards: ICard[] } }
  | { type: string; payload: { cardId: string } }
  | { type: string; payload: { error: string } }
  | { type: string; payload: { filter: string } }
  | { type: string; payload: { isLoading: boolean } }

/** Handles the type of domain state. */
export interface CardState {
  readonly model: CardReduxModel
  readonly ui: CardReduxUI
}
