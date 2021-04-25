/** Defines the specified domain data. */
export interface IUser {
  userId: string
}

/** Defines the action types. */
export enum UserActionTypes {
  SET_USER = 'user/SET_USER',
  SET_TOTAL_CARDS = 'user/SET_TOTAL_CARDS',
  SUBTRACT_TOTAL_CARDS = 'user/SUBTRACT_TOTAL_CARDS'
}

export type UserActionPayloads = {
  userId?: string
  totalCards?: number
}

export type UserAction = {
  type: UserActionTypes
  payload: UserActionPayloads
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserReduxModel extends IUser {}

export interface UserReduxUI {
  totalCards: number
}

export type UserReduxEvent =
  | { type: string; payload: { userId: string } }
  | { type: string; payload: { totalCards: number } }

/** Handles the type of domain state. */
export interface UserState {
  readonly model: UserReduxModel
  readonly ui: UserReduxUI
}
