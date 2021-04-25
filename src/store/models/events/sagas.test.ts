import sagaHelper from 'redux-saga-testing'
import { put, call, all } from 'redux-saga/effects'
import { deleteACard, editACard, viewACard } from './sagas'
import { IEvent } from './types'
import { build, fake } from '@jackfranklin/test-data-bot'
import { deleteCard, editCard, setCardId, setError } from '../card/actions'
import { subtractTotalCards } from '../user/actions'
import {
  Analytics1EventNames,
  sendEvent as analytics1
} from '../../../api/analytics1'
import {
  Analytics2EventNames,
  sendEvent as analytics2
} from '../../../api/analytics2'

// Builders
const eventBuilder = build<IEvent>('Event', {
  fields: {
    cardId: fake(f => f.random.uuid()),
    userId: fake(f => f.random.uuid()),
    timestamp: new Date().getTime(),
    totalCards: fake(f => f.random.number({ min: 0, max: 10 })),
    meta: {
      name: fake(f => f.lorem.words()),
      img: fake(f => f.internet.url())
    }
  }
})

// Test Suiter
describe('[Model: Events] Sagas', () => {
  // EVENT_DELETE
  describe('Use Case 1: Delete a card', () => {
    // Happy path
    describe('Happy path', () => {
      const event = eventBuilder()
      const it = sagaHelper(deleteACard(event))
      it('Step 1 - should call deleteCard', result => {
        expect(result).toEqual(put(deleteCard(event.cardId)))
      })
      it('Step 2 - should call subtractTotalCards', result => {
        expect(result).toEqual(put(subtractTotalCards(event.totalCards)))
      })
      it('Step 3 - should call analytics1 and analytics 2', result => {
        expect(result).toEqual(
          all([
            call(analytics1, Analytics1EventNames.DELETE_CARD, event),
            call(analytics2, Analytics2EventNames.DELETE_CARD, event)
          ])
        )
      })
    })

    // API Error
    describe('API Broken', () => {
      const event = eventBuilder()
      const it = sagaHelper(deleteACard(event))
      it('Step 1 - should call deleteCard', result => {
        expect(result).toEqual(put(deleteCard(event.cardId)))
      })
      it('Step 2 - should call subtractTotalCards', result => {
        expect(result).toEqual(put(subtractTotalCards(event.totalCards)))
      })
      it('Step 3 - should call analytics1 and analytics 2', result => {
        expect(result).toEqual(
          all([
            call(analytics1, Analytics1EventNames.DELETE_CARD, event),
            call(analytics2, Analytics2EventNames.DELETE_CARD, event)
          ])
        )
        return new Error('Something went wrong')
      })
      it('Step 4 - should call setError', result => {
        expect(result).toEqual(put(setError('Something went wrong')))
      })
    })
  })

  // EDIT A CARD
  describe('Use Case 2: Edit a card', () => {
    // Happy path
    describe('Happy path', () => {
      const event = eventBuilder()
      const it = sagaHelper(editACard(event))
      it('Step 1 - should call editCard', result => {
        if (event.meta) {
          expect(result).toEqual(
            put(editCard(event.cardId, event.meta.name, event.meta.img))
          )
        }
      })
      it('Step 2 - should call analytics1 and analytics 2', result => {
        expect(result).toEqual(
          all([
            call(analytics1, Analytics1EventNames.EDIT_CARD, event),
            call(analytics2, Analytics2EventNames.EDIT_CARD, event)
          ])
        )
      })
    })

    // API Error
    describe('API Broken', () => {
      const event = eventBuilder()
      const it = sagaHelper(editACard(event))
      it('Step 1 - should call editCard', result => {
        if (event.meta) {
          expect(result).toEqual(
            put(editCard(event.cardId, event.meta.name, event.meta.img))
          )
        }
      })
      it('Step 2 - should call analytics1 and analytics 2', result => {
        expect(result).toEqual(
          all([
            call(analytics1, Analytics1EventNames.EDIT_CARD, event),
            call(analytics2, Analytics2EventNames.EDIT_CARD, event)
          ])
        )
        return new Error('Something went wrong')
      })
      it('Step 3 - should call setError', result => {
        expect(result).toEqual(put(setError('Something went wrong')))
      })
    })
  })

  // VIEW A CARD
  describe('Use Case 3: View a card', () => {
    // Happy path
    describe('Happy path', () => {
      const event = eventBuilder()
      const it = sagaHelper(viewACard(event))
      it('Step 1 - should call setCardId', result => {
        expect(result).toEqual(put(setCardId(event.cardId)))
      })
      it('Step 3 - should call analytics1 and analytics 2', result => {
        expect(result).toEqual(
          all([
            call(analytics1, Analytics1EventNames.VIEW_CARD, event),
            call(analytics2, Analytics2EventNames.VIEW_CARD, event)
          ])
        )
      })
    })

    // API Error
    describe('API Broken', () => {
      const event = eventBuilder()
      const it = sagaHelper(viewACard(event))
      it('Step 1 - should call setCardId', result => {
        expect(result).toEqual(put(setCardId(event.cardId)))
      })
      it('Step 3 - should call analytics1 and analytics 2', result => {
        expect(result).toEqual(
          all([
            call(analytics1, Analytics1EventNames.VIEW_CARD, event),
            call(analytics2, Analytics2EventNames.VIEW_CARD, event)
          ])
        )
        return new Error('Something went wrong')
      })
      it('Step 3 - should call setError', result => {
        expect(result).toEqual(put(setError('Something went wrong')))
      })
    })
  })
})
