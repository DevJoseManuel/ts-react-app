export enum Analytics2EventNames {
  DELETE_CARD = 'DELETE_CARD',
  EDIT_CARD = 'EDIT_CARD',
  VIEW_CARD = 'VIEW_CARD'
}

export type Analytics2EventProps = {
  userId: string
  cardId: string
  totalCards: number
  timestamp: number
}

export function sendEvent(
  eventName: Analytics2EventNames,
  eventProperties: Analytics2EventProps
): void {
  console.log('analytics 2', { eventName, eventProperties })
}
