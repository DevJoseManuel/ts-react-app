type IEventMetaCard = {
  name: string
  img: string
}

type IEventMeta = IEventMetaCard

export interface IEvent {
  userId: string
  cardId: string
  totalCards: number
  timestamp: number
  meta?: IEventMeta
}

export enum EventActionTypes {
  DELETE_CARD = 'events/DELETE_CARD',
  EDIT_CARD = 'events/EDIT_CARD',
  VIEW_CARD = 'events/VIEW_CARD'
}

export type EventReduxEvent = {
  type: string
  payload: { type: EventActionTypes; data: IEvent }
}
