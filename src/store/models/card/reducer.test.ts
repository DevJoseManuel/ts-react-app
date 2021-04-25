import faker from 'faker'
import { cardReducer, initialState } from './reducer'
import { AnyAction } from 'redux'
import { CardAction, CardActionTypes, ICard } from './types'
import { build, fake } from '@jackfranklin/test-data-bot'
import { normalize } from 'normalizr'
import { deckSchema } from './reducer'

// Fake Builder
const cardBuilder = build<ICard>('Card', {
  fields: {
    _id: fake(f => f.random.uuid()),
    name: fake(f => f.lorem.words()),
    imageUrl: fake(f => f.internet.url()),
    count: {
      total: fake(f => f.random.number({ min: 0, max: 10 }))
    }
  }
})

const deckBuilder = (): ICard[] => {
  const total = faker.random.number({ min: 1, max: 10 })
  return Array.from({ length: total }).map(() => cardBuilder())
}

// Test Suite
describe('[Model: Card] Reducer', () => {
  // Initial state
  it('should return the initial state', () => {
    const action: AnyAction = { type: 'INITIAL' }
    expect(cardReducer(undefined, action)).toEqual(initialState)
  })

  // CLEAR_ALERT
  it('should handle CLEAR_ALERT', () => {
    // Arrange
    const action: CardAction = { type: CardActionTypes.CLEAR_ALERT }
    // Act
    const redux = cardReducer(initialState, action)
    // Assert
    expect(redux.ui.message).toBeUndefined()
  })

  // CLEAR_CARD_ID
  it('should handle CLEAR_CARD_ID', () => {
    // Arrange
    const action: CardAction = { type: CardActionTypes.CLEAR_CARD_ID }
    // Act
    const redux = cardReducer(initialState, action)
    // Assert
    expect(redux.ui.cardId).toBeUndefined()
  })

  // CLEAR_FILTER
  it('should handle CLEAR_FILTER', () => {
    // Arrange
    const action: CardAction = { type: CardActionTypes.CLEAR_FILTER }
    // Act
    const redux = cardReducer(initialState, action)
    // Assert
    expect(redux.ui.filter).toBeUndefined()
  })

  // DELETE_CARD
  it('should handle DELETE_CARD', () => {
    // Arrange
    const cards = deckBuilder()
    let action: CardAction = {
      type: CardActionTypes.SET_CARDS,
      payload: { cards }
    }
    if (action.payload && action.payload.cards) {
      let redux = cardReducer(initialState, action)
      action = {
        type: CardActionTypes.DELETE_CARD,
        payload: { cardId: cards[0]._id }
      }
      if (action.payload && action.payload.cardId) {
        // Act
        redux = cardReducer(redux, action)
        // Assert
        expect(redux.model.result).toEqual(
          expect.not.arrayContaining([cards[0]._id])
        )
        expect(redux.model.entities.card).toEqual(
          expect.not.objectContaining({ [cards[0]._id]: cards[0]._id })
        )
        expect(redux.ui.message).toBe('Card deleted!')
        expect(redux.ui.filter).toEqual(
          expect.not.arrayContaining([cards[0]._id])
        )
      }
    }
  })

  // EDIT_CARD
  it('should handle EDIT_CARD', () => {
    // Arrange
    const cards = deckBuilder()
    let action: CardAction = {
      type: CardActionTypes.SET_CARDS,
      payload: { cards }
    }
    if (action.payload && action.payload.cards) {
      let redux = cardReducer(initialState, action)
      action = {
        type: CardActionTypes.EDIT_CARD,
        payload: {
          cardId: cards[0]._id,
          name: faker.lorem.words(),
          imageUrl: faker.internet.url()
        }
      }
      if (
        action.payload &&
        action.payload.cardId &&
        action.payload.name &&
        action.payload.imageUrl
      ) {
        // Act
        redux = cardReducer(redux, action)
        // Expect
        const entity = redux.model.entities.card[action.payload.cardId]
        expect(entity.name).toBe(action.payload.name)
        expect(entity.imageUrl).toBe(action.payload.imageUrl)
      }
    }
  })

  // SET_CARD_ID
  it('should handle SET_CARD_ID', () => {
    // Arrange
    const action: CardAction = {
      type: CardActionTypes.SET_CARD_ID,
      payload: { cardId: cardBuilder()._id }
    }
    if (action.payload && action.payload.cardId) {
      // Act
      const redux = cardReducer(initialState, action)
      // Expect
      expect(redux.ui.cardId).toBe(action.payload.cardId)
    }
  })

  // SET_CARDS
  it('should handle SET_CARDS', () => {
    // Arrange
    const action: CardAction = {
      type: CardActionTypes.SET_CARDS,
      payload: { cards: deckBuilder() }
    }
    if (action.payload && action.payload.cards) {
      // Act
      const redux = cardReducer(initialState, action)
      // Expect
      expect(redux.model).toEqual(normalize(action.payload.cards, deckSchema))
    }
  })

  // SET_ERROR
  it('should handle SET_ERROR', () => {
    // Arrange
    const action: CardAction = {
      type: CardActionTypes.SET_ERROR,
      payload: { error: faker.lorem.words() }
    }
    if (action.payload && action.payload.error) {
      // Act
      const redux = cardReducer(initialState, action)
      // Expect
      expect(redux.ui.error).toBe(action.payload.error)
    }
  })

  // SET_FILTER
  it('should handle SET_FILTER', () => {
    // Arrange
    const cards = deckBuilder()
    let action: CardAction = {
      type: CardActionTypes.SET_CARDS,
      payload: { cards }
    }
    if (action.payload && action.payload.cards) {
      let redux = cardReducer(initialState, action)
      action = {
        type: CardActionTypes.SET_FILTER,
        payload: { filter: faker.random.alphaNumeric(1) }
      }
      if (action.payload && action.payload.filter) {
        // Act
        redux = cardReducer(redux, action)
        const txt = action.payload.filter.toLowerCase()
        // Expect
        const filtered = {
          text: action.payload.filter,
          results: Object.values(redux.model.entities.card)
            .filter(card => card.name.toLowerCase().indexOf(txt) !== -1)
            .map(card => card._id)
        }
        expect(redux.ui.filter).toEqual(filtered)
      }
    }
  })

  // SET_LOADING
  it('should handle SET_LOADING', () => {
    // Arrange
    const action: CardAction = {
      type: CardActionTypes.SET_LOADING,
      payload: { isLoading: faker.random.number({ min: 0, max: 10 }) >= 5 }
    }
    if (action.payload && action.payload.isLoading) {
      // Act
      const redux = cardReducer(initialState, action)
      // Assert
      expect(redux.ui.loading).toBe(action.payload.isLoading)
    }
  })
})
