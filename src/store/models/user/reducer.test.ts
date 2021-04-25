import faker from 'faker'
import { userReducer, initialState } from './reducer'
import { AnyAction } from 'redux'
import { build, fake } from '@jackfranklin/test-data-bot'
import { UserAction, UserActionTypes, UserState } from './types'

// State Builder
const stateBuilder = build<UserState>('UserState', {
  fields: {
    model: {
      userId: fake(f => f.random.uuid())
    },
    ui: {
      totalCards: fake(f => f.random.number({ min: 0, max: 100 }))
    }
  }
})

// Test Suite
describe('[Model: User] Reducer', () => {
  // Initial state
  it('should return the initial state', () => {
    const action: AnyAction = { type: 'INITIAL' }
    expect(userReducer(undefined, action)).toEqual(initialState)
  })

  // SET_TOTAL_CARDS
  it('should handle SET_TOTAL_CARDS', () => {
    // Arrange
    const state = stateBuilder()
    const action: UserAction = {
      type: UserActionTypes.SET_TOTAL_CARDS,
      payload: { userId: state.model.userId }
    }
    // Act
    const redux = userReducer(state, action)
    // Assert
    expect(redux.ui.totalCards).toBe(action.payload.totalCards)
  })

  // SET_USER
  it('should handle SET_USER', () => {
    // Arrange
    const state = stateBuilder()
    const action: UserAction = {
      type: UserActionTypes.SET_USER,
      payload: { userId: faker.random.uuid() }
    }
    // Act
    const redux = userReducer(state, action)
    // Assert
    expect(redux.model.userId).toBe(action.payload.userId)
  })

  // SUBTRACT_TOTAL_CARDS
  it('should handle SUBTRACT_TOTAL_CARDS', () => {
    // Arrange
    const state = stateBuilder()
    const action: UserAction = {
      type: UserActionTypes.SUBTRACT_TOTAL_CARDS,
      payload: { totalCards: faker.random.number({ min: 0, max: 10 }) }
    }
    if (action.payload.totalCards) {
      // Act
      const redux = userReducer(state, action)
      const newTotal = state.ui.totalCards - action.payload.totalCards
      // Assert
      expect(redux.ui.totalCards).toBe(newTotal)
    }
  })
})
