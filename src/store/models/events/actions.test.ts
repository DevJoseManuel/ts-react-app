import * as actions from './actions'
import { build, fake, oneOf } from '@jackfranklin/test-data-bot'
import { IEvent, EventActionTypes } from './types'

// Fake Builder
const eventBuilder = build<IEvent>('Event', {
  fields: {
    userId: fake(f => f.random.uuid()),
    cardId: fake(f => f.random.uuid()),
    totalCards: fake(f => f.random.number({ min: 0, max: 10 })),
    timestamp: new Date().getTime()
  }
})

const payloadBuilder = build<{ type: EventActionTypes; data: IEvent }>(
  'Event',
  {
    fields: {
      type: oneOf(
        EventActionTypes.DELETE_CARD,
        EventActionTypes.EDIT_CARD,
        EventActionTypes.VIEW_CARD
      ),
      data: {
        userId: fake(f => f.random.uuid()),
        cardId: fake(f => f.random.uuid()),
        totalCards: fake(f => f.random.number({ min: 0, max: 10 })),
        timestamp: new Date().getTime(),
        meta: {
          name: fake(f => f.lorem.words()),
          img: fake(f => f.internet.url())
        }
      }
    }
  }
)

// Action Builder
const actionBuilder = (
  type: EventActionTypes,
  data: IEvent
): { type: string; payload: { type: EventActionTypes; data: IEvent } } => ({
  type: 'CALL_EVENT',
  payload: { type, data }
})

// Test Suite
describe('[Model: Event] Action Creators', () => {
  // CALL EVENT
  it('should create an action to call an event', () => {
    const payload = payloadBuilder()
    const expectedAction = { type: 'CALL_EVENT', payload }
    expect(actions.callEvent(payload.type, payload.data)).toEqual(
      expectedAction
    )
  })

  // DELETE CARD
  it('should create an action to delete a card', () => {
    const event = eventBuilder()
    const expectedAction = actionBuilder(EventActionTypes.DELETE_CARD, event)
    expect(actions.callEvent(EventActionTypes.DELETE_CARD, event)).toEqual(
      expectedAction
    )
  })

  // EDIT CARD
  it('should create an action to edit a card', () => {
    const event = eventBuilder()
    const expectedAction = actionBuilder(EventActionTypes.EDIT_CARD, event)
    expect(actions.callEvent(EventActionTypes.EDIT_CARD, event)).toEqual(
      expectedAction
    )
  })

  // VIEW CARD
  it('should create an action to view a card', () => {
    const event = eventBuilder()
    const expectedAction = actionBuilder(EventActionTypes.VIEW_CARD, event)
    expect(actions.callEvent(EventActionTypes.VIEW_CARD, event)).toEqual(
      expectedAction
    )
  })
})
