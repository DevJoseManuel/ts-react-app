export enum Analytics1EventNames {
  DELETE_CARD = 'DELETE_CARD',
  EDIT_CARD = 'EDIT_CARD',
  VIEW_CARD = 'VIEW_CARD'
}

export type Analytics1EventProps = {
  userId: string
  cardId: string
  totalCards: number
  timestamp: number
}

export function sendEvent(
  eventName: Analytics1EventNames,
  eventProperties: Analytics1EventProps
): void {
  console.log('analytics 1', { eventName, eventProperties })
}
