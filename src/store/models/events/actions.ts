import { EventActionTypes, IEvent } from './types'

export const callEvent = (
  type: EventActionTypes,
  data: IEvent
): { type: string; payload: { type: EventActionTypes; data: IEvent } } => ({
  type: 'CALL_EVENT',
  payload: { type, data }
})
